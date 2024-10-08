import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VersionService } from 'src/app/demo/service/version.service';
import { Subscription, interval } from 'rxjs';
import { MessageService, SelectItem } from 'primeng/api';
import { NodeService } from 'src/app/demo/service/nodeDataArray.service';
import { LinkService } from 'src/app/demo/service/linkDataArray.service';
import { ElementService } from 'src/app/demo/service/element.service';
import { UserService } from 'src/app/demo/service/user.service';
import { WorkflowService } from 'src/app/demo/service/workflow.service';
import { Formulaire } from 'src/app/demo/interfaces/Formulaire';
import { EntitePrimaireService } from 'src/app/demo/service/entitePrimaire.service';
import { ColumnDetails } from 'src/app/demo/interfaces/ColumnDetails';

declare function init(): void; // Declare the global init function
declare const go: any;

@Component({
  templateUrl: './details.html',
  styleUrls: ['../../../../../styles.scss'],
  providers: [MessageService]
})
export class DetailsComponent implements OnInit, OnDestroy {
  version: any;
  Dialog: boolean = false;
  shapeDetails: { category: string, key: string, loc: string } | null = null;
  autoSaveSubscription: Subscription | undefined;
  titre: string = '';
  approbateur: string = '';
  escalader: boolean | null = null;
  escaladerOptions: SelectItem[] = [];
  delaiEscalade: number = 0;
  workflow: string = '';
  resultatOptions: SelectItem[] = [];
  resultat: boolean[] = [];
  nextNode: number[] = [];
  elements: any[] = [];
  nodes: any[] = [];
  links: any[] = [];
  choix: { value: string }[] = [];
  jsonRepresentation: string = '';
  linkCount: number = 0;
  filteredLinks: any[] = [];
  formulaireValues: string[] = [];
  formulaires: { formulaireValues: string, nextNode: number, resultat: boolean }[] = [];
  
  ModelJson: string = '';
  emailOptions: string[] = [];
  workflowOptions: string[] = [];
  columns: string[] = []; // Remove this line
  showDropdown: boolean = false; // Flag to control dropdown visibility
  selectedColumn: string = ''; // Property to hold selected column
  textareaValues: string[] = []; 
  syntaxErrors: boolean[] = [];
  syntaxMessages: string[] = [];
  tableColumns: ColumnDetails[] = []; // Add this line

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private versionService: VersionService,
    private workflowService: WorkflowService,
    private entitePrimaireService : EntitePrimaireService,
    private nodeService: NodeService,
    private linkService: LinkService,
    private elementService: ElementService,
    private messageService: MessageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getVersionId();
    this.resultatSelection();
    this.escaladerSelection();
    this.loadEmailOptions();
    this.loadWorkflowOptions();
    this.initializeTextareaValues();
   
    init();
    (window as any).handleShapeClickFromJS = this.handleShapeClick.bind(this);
    this.autoSaveSubscription = interval(1000).subscribe(() => this.autoSave());
    
    // Automatically load data from the database when the component initializes
    const versionId = this.route.snapshot.paramMap.get('id');
    if (versionId) {
      this.loadFromDatabase(parseInt(versionId));
      
    }

    
  }
  
  


  ngOnDestroy(): void {
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe();
    }
  }

  getVersionId() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const detailsId = Number(id);
      this.versionService.findOne(detailsId).subscribe(
        res => {
          this.version = res;
          const tableName = this.extractTableName();
    console.log('tableName:', tableName);
    if (tableName) {
      this.fetchTableColumns(tableName);
    } else {
      console.error('Table name is undefined');
    }
        },
        err => console.error(err)
      );
    }
  }

  handleShapeClick(details: { category: string, key: string, loc: string }) {
    console.log("Clicked shape details:", details);

    if (details.category == "Approbation" ||
        details.category == "AutoDecision" ||
        details.category == "ManuelleDecision" ||
        details.category == "ParalleleBranche" ||
        details.category == "SousWorkflow" ||
        details.category == "LignesDeWorkflow") {
      this.onSelectItem(details);
    }
  }

  openNew() {
    this.Dialog = true;
  }

  resetFormFields() {
    this.titre = '';
    this.approbateur = '';
    this.escalader;
    this.delaiEscalade = 0;
    this.workflow = '';
    this.formulaireValues = [];
  }

  onSelectItem(shapeDetails: any) {
    this.shapeDetails = shapeDetails;

    // Reset form fields when a new item is selected
    this.resetFormFields();
    
    const selectedElementKey = parseInt(this.shapeDetails?.key || "");
    const elementIndex = this.elements.findIndex((element: any) => element.key === selectedElementKey);

    if (shapeDetails && elementIndex !== -1) {
        const existingElement = this.elements[elementIndex];
        this.titre = existingElement.titre;
        this.approbateur = existingElement.approbateur;
        this.escalader = existingElement.escalader;
        this.delaiEscalade = existingElement.delaiEscalade;
        
        // Check for existing formulaires (database-loaded)
        if (existingElement.formulaires && existingElement.formulaires.length > 0) {
            this.formulaireValues = existingElement.formulaires.map((form: Formulaire) => form.formulaireValues);
            this.nextNode = existingElement.formulaires.map((form: Formulaire) => form.nextNode);
            this.resultat = existingElement.formulaires.map((form: Formulaire) => form.resultat);
        } else if (existingElement.formulaire && existingElement.formulaire.length > 0) {
            // Check for in-progress formulaires (before saving)
            this.formulaireValues = existingElement.formulaire.map((form: any) => form.formulaireValues);
            this.nextNode = existingElement.formulaire.map((form: any) => form.nextNode);
            this.resultat = existingElement.formulaire.map((form: any) => form.resultat);
        } else {
            // Initialize to empty arrays if no formulaire exists
            this.formulaireValues = [];
            this.nextNode = [];
            this.resultat = [];
        }
    } else {
        // Handle case where element is not found or shapeDetails is invalid
        this.titre = '';
        this.approbateur = '';
        this.escalader = false;
        this.delaiEscalade = 0;
        this.formulaireValues = [];
        this.nextNode = [];
        this.resultat = [];
    }

    const linkDataArray = (window as any).myDiagram.model.linkDataArray || [];
    const filteredLinks = linkDataArray.filter((link: any) => link.from === selectedElementKey);

    const filteredLinksToProperty = filteredLinks.map((link: any) => ({ to: link.to }));
    this.filteredLinks = filteredLinksToProperty;

    const nextNode = filteredLinks.map((link: any) => link.to);
    this.nextNode = nextNode;

    const formulaireArray = this.formulaireValues.map((value: string, index: number) => ({
        formulaireValues: value,
        nextNode: nextNode[index],
        resultat: this.resultat[index]
    }));

    this.formulaires = formulaireArray;

    const jsonRepresentation = JSON.stringify({
        class: "go.GraphLinksModel",
        linkDataArray: filteredLinks.map((link: any) => ({ to: link.to })) || [], 
    }, (key, value) => {
        if (key === 'from' && value === selectedElementKey) {
            return '[Circular]';
        }
        return value;
    }, 2);

    this.jsonRepresentation = jsonRepresentation;
    this.Dialog = true; // Show dialog after processing
}


submitVersion() {
  if (this.shapeDetails && this.version) {
      if (!this.version.nodeDataArray) {
          this.version.nodeDataArray = [];
      }

      const nodeIndex = this.version.nodeDataArray.findIndex((node: any) => node.key === parseInt(this.shapeDetails?.key || ""));
      const formulaireArray = this.formulaireValues.map((value: string, index: number) => ({
          formulaireValues: value,
          nextNode: this.nextNode[index],
          resultat:this.resultat[index] // Include the resultat property here
      }));

      if (nodeIndex !== -1) {
          this.version.nodeDataArray[nodeIndex] = {
              ...this.version.nodeDataArray[nodeIndex],
              titre: this.titre,
              approbateur: this.approbateur,
              escalader: this.escalader,
              delaiEscalade: this.delaiEscalade,
              // Remove resultat from here
              formulaire: formulaireArray,
              workflow: this.workflow,
          };
      }

      const elementIndex = this.elements.findIndex((element: any) => element.key === parseInt(this.shapeDetails?.key || ""));
      if (elementIndex !== -1) {
          this.elements[elementIndex] = {
              key: parseInt(this.shapeDetails.key),
              titre: this.titre,
              approbateur: this.approbateur,
              escalader: this.escalader,
              delaiEscalade: this.delaiEscalade,
              // Remove resultat from here
              formulaire: formulaireArray,
              workflow: this.workflow,
          };
      } else {
          this.elements.push({
              key: parseInt(this.shapeDetails.key),
              titre: this.titre,
              approbateur: this.approbateur,
              escalader: this.escalader,
              delaiEscalade: this.delaiEscalade,
              // Remove resultat from here
              formulaire: formulaireArray,
              workflow: this.workflow,
          });
      }

      const modelJson = JSON.stringify({
          class: "go.GraphLinksModel",
          linkFromPortIdProperty: "fromPort",
          linkToPortIdProperty: "toPort",
          nodeDataArray: this.version.nodeDataArray,
          linkDataArray: this.version.linkDataArray || [],
          Element: this.elements
      }, null, 2);

      const savedModelElement = document.getElementById("mySavedModel") as HTMLTextAreaElement;
      if (savedModelElement) {
          savedModelElement.value = modelJson;
      }

      //this.saveWorkflow(modelJson);
  }

  this.hideDialog();
}

  
  hideDialog() {
    this.Dialog = false;
  }

  autoSave() {
    const savedModelElement = document.getElementById("mySavedModel") as HTMLTextAreaElement;
    if (savedModelElement) {
        const currentModelJson = (window as any).myDiagram.model.toJson();
        let modelObject = JSON.parse(currentModelJson);

        if (!modelObject.Element) {
            modelObject.Element = [];
        }

        if (this.shapeDetails) {
            const key = parseInt(this.shapeDetails.key);
            const elementIndex = this.elements.findIndex((element: any) => element.key === key);

            const formulaireArray = this.formulaireValues.map((value: string, index: number) => ({
                formulaireValues: value,
                nextNode: this.nextNode[index],
                resultat : this.resultat[index],
            }));

            if (elementIndex !== -1) {
                this.elements[elementIndex] = {
                    key,
                    titre: this.titre,
                    approbateur: this.approbateur,
                    escalader: this.escalader,
                    delaiEscalade: this.delaiEscalade,
                    //resultat:this.resultat,
                    //version: this.version.id,
                    formulaire: formulaireArray,
                    workflow:this.workflow,
                };
            } else {
                this.elements.push({
                    key,
                    titre: this.titre,
                    approbateur: this.approbateur,
                    escalader: this.escalader,
                    delaiEscalade: this.delaiEscalade,
                    //resultat:this.resultat,
                   // version: this.version.id,
                    formulaire: formulaireArray,
                    workflow:this.workflow,
                });
            }
        }

        const existingKeys = modelObject.nodeDataArray.map((node: any) => node.key);
        this.elements = this.elements.filter((element: any) => existingKeys.includes(element.key));

        const updatedModelJson = JSON.stringify({
            ...modelObject,
            Element: this.elements
        }, null, 2);

        savedModelElement.value = updatedModelJson;
        (window as any).myDiagram.isModified = false;
        this.ModelJson=updatedModelJson
        //this.saveWorkflow(updatedModelJson);
    }
}


saveWorkflow(versionId: number) {
  const id = versionId;
  const versionDetails = JSON.parse(this.ModelJson);
  this.versionService.updateVersionWithDetails(id, versionDetails).subscribe(
    res => {
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Workflow Saved', life: 3000 });
    },
    err => console.log(err)
  );
}
isSaveDisabled(): boolean {
  return !(this.nodes.length && this.elements.length && this.links.length)== false;
}


load() {
  const savedModelElement = document.getElementById("mySavedModel") as HTMLTextAreaElement;
  if (savedModelElement) {
    (window as any).myDiagram.model = go.Model.fromJson(savedModelElement.value);
  }
}

loadFromDatabase(versionId: number) {
  let jsonStructure: any = {}; // Create an empty object to hold the JSON structure

  // Load nodes
  this.nodeService.findByVersionId(versionId).subscribe(
    nodes => {
      // Process nodes data
      jsonStructure.nodeDataArray = nodes;
      // Assuming you have a property like 'nodes' to hold the node data
      this.nodes = nodes;
      this.setJsonStructureAndTextarea(jsonStructure); // Call a function to set JSON structure and textarea
      this.load(); // Call the load function to load data into the diagram
    },
    error => {
      console.error("Error loading nodes:", error);
    }
  );

  // Load elements
  this.elementService.findByVersionId(versionId).subscribe(
    elements => {
      // Process elements data
      jsonStructure.Element = elements;
      // Assuming you have a property like 'elements' to hold the element data
      this.elements = elements;
      this.setJsonStructureAndTextarea(jsonStructure); 
      this.load();// Call a function to set JSON structure and textarea
    },
    error => {
      console.error("Error loading elements:", error);
    }
  );

  // Load links
  this.linkService.findByVersionId(versionId).subscribe(
    links => {
      // Process links data
      jsonStructure.linkDataArray = links;
      // Assuming you have a property like 'links' to hold the link data
      this.links = links;
      this.setJsonStructureAndTextarea(jsonStructure); 
      this.load();// Call a function to set JSON structure and textarea
    },
    error => {
      console.error("Error loading links:", error);
    }
  );
}

// Function to set JSON structure and textarea
setJsonStructureAndTextarea(jsonStructure: any) {
  const json = JSON.stringify(jsonStructure); // Convert the JSON structure to a string
  const textarea = document.getElementById("mySavedModel");
  if (textarea) {
    textarea.innerText = json; // Set textarea value
  }
}

  printDiagram() {
    const svgWindow: Window | null = window.open();
    if (!svgWindow) return;
    const printSize: any = new (window as any).go.Size(700, 960);
    const bnds: any = (window as any).myDiagram.documentBounds;
    let x: number = bnds.x;
    let y: number = bnds.y;
    while (y < bnds.bottom) {
      while (x < bnds.right) {
        const svg: SVGElement | null = (window as any).myDiagram.makeSvg({ scale: 1.0, position: new (window as any).go.Point(x, y), size: printSize }); // Use type assertion here
        if (svg) {
          svgWindow.document.body.appendChild(svg);
        }
        x += printSize.width;
      }
      x = bnds.x;
      y += printSize.height;
    }
    setTimeout(() => svgWindow.print(), 1);
  }

  makeSVG() {
    const svg = (window as any).myDiagram.makeSvg({ scale: 0.5 }); // Use type assertion here
    svg.style.border = "1px solid black";
    const obj = document.getElementById("SVGArea");
    if (obj) {
      obj.appendChild(svg);
      if (obj.children.length > 0) {
        obj.replaceChild(svg, obj.children[0]);
      }
    }
  }

  addChoix() {
    this.choix.push({ value: '' });
  }

  removeChoix(index: number) {
    this.choix.splice(index, 1);
  }

  checkSyntax(index: number, formulaireValue: string): void {
    try {
      this.syntaxErrors[index] = false;
      this.syntaxMessages[index] = 'Syntax is valid';
  
      const expression = formulaireValue.trim();
  
      // Pattern to match variables wrapped in $ and conditions
      const conditionPattern = /\$(.+?)\$\s*(==|!=|<=|>=|<|>)\s*('.*?'|\d+)/g;
  
      let match;
      let isValid = true;
  
      // Loop through all matches in the expression
      while ((match = conditionPattern.exec(expression)) !== null) {
        const variableName = match[1].trim();
        const operator = match[2].trim();
        const value = match[3].trim();
  
        const columnDetails = this.tableColumns.find(column => column.column_name === variableName);
        if (!columnDetails) {
          throw new Error(`Column '${variableName}' not found.`);
        }
  
        // Validate value based on column data type
        switch (columnDetails.data_type) {
          case 'integer':
          case 'smallint':
          case 'bigint':
          case 'serial':
          case 'smallserial':
          case 'bigserial':
            if (!/^-?\d+$/.test(value)) {
              isValid = false;
              throw new Error(`Invalid value for '${variableName}'. Expected an integer.`);
            }
            break;
          case 'real':
          case 'double precision':
          case 'numeric':
          case 'decimal':
            if (!/^-?\d+(\.\d+)?$/.test(value)) {
              isValid = false;
              throw new Error(`Invalid value for '${variableName}'. Expected a numeric value.`);
            }
            break;
          case 'character varying':
          case 'varchar':
          case 'character':
          case 'char':
          case 'text':
            if (!(/^'.*'$/.test(value))) {
              isValid = false;
              throw new Error(`Invalid value for '${variableName}'. Expected a string enclosed in single quotes.`);
            }
            break;
          case 'boolean':
            if (!/^(true|false)$/.test(value.toLowerCase())) {
              isValid = false;
              throw new Error(`Invalid value for '${variableName}'. Expected a boolean value (true/false).`);
            }
            break;
          case 'date':
          case 'timestamp':
          case 'timestamp without time zone':
          case 'timestamp with time zone':
            if (!/^'\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?'$/.test(value)) {
              isValid = false;
              throw new Error(`Invalid value for '${variableName}'. Expected a date or timestamp enclosed in single quotes.`);
            }
            break;
          // Add more cases as needed for other data types
          default:
            // Handle other data types or provide a default behavior
            throw new Error(`Unsupported data type '${columnDetails.data_type}' for column '${variableName}'.`);
        }
      }
  
      // If no matches are found, it means the expression is invalid
      if (!conditionPattern.exec(expression)) {
        throw new Error('Invalid expression. Ensure it matches the pattern $variable$ operator value.');
      }
  
      // Evaluate the expression to ensure it's syntactically correct
      new Function(`return ${expression}`);
  
    } catch (e: unknown) {
      const error = e as Error;
      this.syntaxErrors[index] = true;
      this.syntaxMessages[index] = 'Syntax Error: ' + error.message;
    }
  }
  
  
resultatSelection() {
  this.resultatOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];
}

escaladerSelection() {
  this.escaladerOptions = [
    { label: 'True', value: true },
    { label: 'False', value: false }
  ];
}

getNodeTitle(key: number): string {
  const node = this.elements.find((element: any) => element.key === key);
  return node ? node.titre : 'Unknown';
}

loadEmailOptions() {
  this.userService.getUsers().subscribe(
    (users: any[]) => {
      this.emailOptions = users.map(user => user.email);
    },
    (error) => {
      console.error('Error fetching user emails', error);
    }
  );
}

loadWorkflowOptions() {
  this.workflowService.findAll().subscribe(
    (workflows: any[]) => {
      this.workflowOptions = workflows.map(workflow => workflow.titre);
    },
    (error) => {
      console.error('Error fetching workflows', error);
    }
  );
}
initializeTextareaValues() {
  // Initialize textareaValues with empty strings
  this.formulaireValues = this.formulaireValues.slice();
}


onInputChange(inputValue: string, index: number) {
  this.formulaireValues[index] = inputValue;
}

private extractTableName(): string | undefined {
  return this.version?.workflow?.entitePrimaire?.databaseEntity; // Adjust according to your actual structure
}

private fetchTableColumns(tableName: string) {
  this.entitePrimaireService.getTableColumns(tableName).subscribe(
    columns => {
      // Update tableColumns with fetched column details
      this.tableColumns = columns;
      // Extract column names from the response
      this.columns = columns.map(column => column.column_name); // Add this line if you still need the column names separately
    },
    error => {
      console.error('Error fetching table columns:', error);
    }
  );
}


onColumnSelect(column: string, index: number) {
  if (this.formulaireValues[index] === undefined) {
    this.formulaireValues[index] = '';
  }

  const columnWrapper = `$${column}$`;
  this.formulaireValues[index] += columnWrapper;

  // Hide dropdown after selection
  this.showDropdown = false;

  // Reset selectedColumn to force the change event even when the same column is selected consecutively
  setTimeout(() => {  // Adding a slight delay to ensure ngModel is updated before resetting
    this.selectedColumn = '';
  }, 0);
}


}
