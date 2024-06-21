
var myDiagram;
var go;
  function init() {
    if (window.goSamples) goSamples();  
    var $ = go.GraphObject.make; 
    myDiagram =
      $(go.Diagram, "myDiagramDiv", 
        {
          initialContentAlignment: go.Spot.Center,
          allowDrop: true, 
          "LinkDrawn": showLinkLabel,  
          "LinkRelinked": showLinkLabel,
          "animationManager.duration": 800,
          "undoManager.isEnabled": true 
        });

        myDiagram.addDiagramListener("ObjectSingleClicked", function (e) {
          var part = e.subject.part;
          if (part) {
            // Call the Angular component's handleShapeClick function with the category and key
            window.handleShapeClickFromJS({ category: part.category, key: part.data.key, loc : part.data.loc });
          }
        });
        
        
        
      


    function nodeStyle() {
      return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center,
          isShadowed: true,
          shadowColor: "#888",
          // handle mouse enter/leave events to show/hide the ports
          mouseEnter: function (e, obj) { showPorts(obj.part, true); },
          mouseLeave: function (e, obj) { showPorts(obj.part, false); }
        }
      ];
    }

// Event listener for link creation
myDiagram.addDiagramListener("LinkDrawn", function(e) {
  var link = e.subject;
  var fromNode = link.fromNode;
  var toNode = link.toNode;
  
  // Check if the fromNode is not ParalleleBranche
  if (fromNode && (fromNode.category !== "ParalleleBranche" && fromNode.category !== "ManuelleDecision" && fromNode.category !== "AutoDecision") && toNode) {
    var outgoingLinksCount = 0;
    fromNode.findLinksOutOf().each(function(l) {
      outgoingLinksCount++;
    });
    if (outgoingLinksCount > 1) {
      // Cancel the creation of the link
      myDiagram.remove(link);
      console.log("Only one outgoing link is allowed from the node.");
    }
  }
  /*
  // Check if the toNode is not ParalleleBranche
  if (toNode && toNode.category !== "ParalleleBranche") {
    var incomingLinksCount = 0;
    toNode.findLinksInto().each(function(l) {
      incomingLinksCount++;
    });
    if (incomingLinksCount > 1) {
      // Cancel the creation of the link
      myDiagram.remove(link);
      console.log("Only one incoming link is allowed to the node.");
    }
  }
*/

});



function showPorts(node, show) {
  var diagram = node.diagram;
  if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
  node.ports.each(function(port) {
    port.stroke = (show ? "white" : null);
  });
}

  
    function makePort(name, spot, output, input) {
      return $(go.Shape, "Circle",
               {
                  //fill: "transparent",
                  fill: "#606060",
                  stroke: "#282c34", 
                  desiredSize: new go.Size(8, 8),
                  alignment: spot, alignmentFocus: spot, 
                  portId: name, 
                  fromSpot: spot, toSpot: spot, 
                  fromLinkable: output, toLinkable: input, 
                  cursor: "pointer" 
               });
               
    }
    

      //Start
      myDiagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", nodeStyle(),
        $(go.Panel, "Spot",
          $(go.Shape, "Circle",
            { minSize: new go.Size(10, 10),  maxSize: new go.Size(40, 40),fill: "#79C900", stroke: null }),
          $(go.Panel, "Vertical", 
            { alignment: new go.Spot(0.5, 1.1, 0, 5) }, 
            $(go.TextBlock, "Start",
              { font: "bold 10pt Helvetica, Arial, sans-serif", stroke: "white" })
          )
        ),
        // three named ports, one on each side except the top, all output only:
        makePort("L", go.Spot.Left, true, false),
        makePort("R", go.Spot.Right, true, false),
        makePort("B", go.Spot.Bottom, true, false)
      ));
    

       //Approbation
       myDiagram.nodeTemplateMap.add("Approbation", 
       $(go.Node, "Spot", nodeStyle(),
         $(go.Panel, "Spot",
           $(go.Shape, "Diamond",
           { minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50), fill: "#282c34", stroke: "#00A9C9", strokeWidth: 3.5 },
             new go.Binding("figure", "figure")),

             $(go.Panel, "Vertical",
             { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
           $(go.TextBlock,
             {
               font: "bold 10pt Helvetica, Arial, sans-serif",
               stroke: "white",
               margin: 8,
               wrap: go.TextBlock.WrapFit,
               textAlign: "center",
               //editable: true
             },
             new go.Binding("text").makeTwoWay()))
         ),
         // four named ports, one on each side:
         makePort("T", go.Spot.Top, false, true),
         makePort("L", go.Spot.Left, true, true),
         makePort("R", go.Spot.Right, true, true),
         makePort("B", go.Spot.Bottom, true, false)
       ));

       //Auto Decision
       myDiagram.nodeTemplateMap.add("AutoDecision", 
       $(go.Node, "Spot", nodeStyle(),
         $(go.Panel, "Spot",
           $(go.Shape, "Hexagon",
           {  minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50),fill: "#282c34", stroke: "#32a852", strokeWidth: 3.5 },
             new go.Binding("figure", "figure")),

             $(go.Panel, "Vertical",
             { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
           $(go.TextBlock,
             {
               font: "bold 10pt Helvetica, Arial, sans-serif",
               stroke: "white",
               margin: 8,
               wrap: go.TextBlock.WrapFit,
               textAlign: "center",
               //editable: true
             },
             new go.Binding("text").makeTwoWay()))
         ),
         makePort("T", go.Spot.Top, false, true),
         makePort("L", go.Spot.Left, true, true),
         makePort("R", go.Spot.Right, true, true),
         makePort("B", go.Spot.Bottom, true, false)
       ));

       //Manuelle Decision
       myDiagram.nodeTemplateMap.add("ManuelleDecision", 
       $(go.Node, "Spot", nodeStyle(),
         $(go.Panel, "Spot",
           $(go.Shape, "Pentagon",
           { minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50), fill: "#282c34", stroke: "#DEE0A3", strokeWidth: 3.5 },
             new go.Binding("figure", "figure")),

             $(go.Panel, "Vertical",
             { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
           $(go.TextBlock,
             {
               font: "bold 10pt Helvetica, Arial, sans-serif",
               stroke: "white",
               margin: 8,
               wrap: go.TextBlock.WrapFit,
               textAlign: "center",
               //editable: true
             },
             new go.Binding("text").makeTwoWay()))
         ),
         makePort("T", go.Spot.Top, false, true),
         makePort("L", go.Spot.Left, true, true),
         makePort("R", go.Spot.Right, true, true),
         makePort("B", go.Spot.Bottom, true, false)
       ));

       //Parallele Branche
       myDiagram.nodeTemplateMap.add("ParalleleBranche", 
       $(go.Node, "Spot", nodeStyle(),
         $(go.Panel, "Spot",
           $(go.Shape, "Ethernet",
           {  minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50),fill: "#282c34", stroke: "#8c75f0", strokeWidth: 3.5 },
             new go.Binding("figure", "figure")),

             $(go.Panel, "Vertical",
             { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
           $(go.TextBlock,
             {
               font: "bold 10pt Helvetica, Arial, sans-serif",
               stroke: "white",
               margin: 8,
               wrap: go.TextBlock.WrapFit,
               textAlign: "center",
               editable: true
             },
             new go.Binding("text").makeTwoWay()))
         ),
         makePort("T", go.Spot.Top, false, true),
         makePort("L", go.Spot.Left, true, true),
         makePort("R", go.Spot.Right, true, true),
         makePort("B", go.Spot.Bottom, true, false)
       ));

        //Sous Workflow
        myDiagram.nodeTemplateMap.add("SousWorkflow", 
        $(go.Node, "Spot", nodeStyle(),
          $(go.Panel, "Spot",
            $(go.Shape, "ThinCross",
            { minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50), fill: "#282c34", stroke: "#75f0ae", strokeWidth: 3.5 },
              new go.Binding("figure", "figure")),

              $(go.Panel, "Vertical",
              { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
            $(go.TextBlock,
              {
                font: "bold 10pt Helvetica, Arial, sans-serif",
                stroke: "white",
                margin: 8,
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true
              },
              new go.Binding("text").makeTwoWay()))
          ),
          makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false)
        ));

        //Lignes De Workflow
        myDiagram.nodeTemplateMap.add("LignesDeWorkflow", 
        $(go.Node, "Spot", nodeStyle(),
          $(go.Panel, "Spot",
            $(go.Shape, "Rectangle",
            { minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50), fill: "#282c34", stroke: "#e39066", strokeWidth: 3.5 },
              new go.Binding("figure", "figure")),
              $(go.Panel, "Vertical",
              { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
            $(go.TextBlock,
              {
                font: "bold 10pt Helvetica, Arial, sans-serif",
                stroke: "white",
                margin: 8,
                wrap: go.TextBlock.WrapFit,
                textAlign: "center",
                editable: true
              },
              new go.Binding("text").makeTwoWay()))
          ),
          makePort("T", go.Spot.Top, false, true),
          makePort("L", go.Spot.Left, true, true),
          makePort("R", go.Spot.Right, true, true),
          makePort("B", go.Spot.Bottom, true, false)
        ));

      //End
    myDiagram.nodeTemplateMap.add("End",
      $(go.Node, "Spot", nodeStyle(),
        $(go.Panel, "Spot",
          $(go.Shape, "Circle",
            {  minSize: new go.Size(50, 50),  maxSize: new go.Size(50, 50), fill: "#DC3C00", stroke: null, }),
            $(go.Panel, "Vertical",
            { alignment: new go.Spot(0.5, 1.1, 0, 5) },  
          $(go.TextBlock, "End",
            { font: "bold 10pt Helvetica, Arial, sans-serif", stroke: "white", },
            new go.Binding("text")))
        ),
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
      ));

     
    // replace the default Link template in the linkTemplateMap
    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
          routing: go.Link.AvoidsNodes,
          curve: go.Link.JumpOver,
          corner: 5, toShortLength: 4,
          relinkableFrom: true,
          relinkableTo: true,
          reshapable: true,
          resegmentable: true,
          // mouse-overs subtly highlight links:
          mouseEnter: function(e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
          mouseLeave: function(e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the highlight shape, normally transparent
          { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, stroke: "white", strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null, fill: "white"}),
        $(go.Panel, "Auto",  // the link label, normally not visible
          { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5},
          new go.Binding("visible", "visible").makeTwoWay(),
          $(go.Shape, "RoundedRectangle",  // the label shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock, "Yes",  // the label
            {
              textAlign: "center",
              font: "10pt helvetica, arial, sans-serif",
              stroke: "#333333",
              editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );
    // Make link labels visible if coming out of a "conditional" node.
    // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
    function showLinkLabel(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }
    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
    // load an initial diagram from some JSON text
    // initialize the Palette that is on the left side of the page
    myPalette =
      $(go.Palette, "myPaletteDiv",  // must name or refer to the DIV HTML element
        {
          "animationManager.duration": 800, // slightly longer than default (600ms) animation
          nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
          model: new go.GraphLinksModel([  // specify the contents of the Palette
            { category: "Start", text: "Start" },
            { category: "Approbation", text: "Approbation" },
            { category: "AutoDecision", text: "Auto Decision" },
            { category: "ManuelleDecision", text: "Manuelle Decision" },
            { category: "ParalleleBranche", text: "Parallele Branche" },
            { category: "SousWorkflow", text: "Sous Workflow" },
            { category: "LignesDeWorkflow", text: "Lignes De Workflow" },
            { category: "End", text: "End" },
          ])
        });

        function animateFadeDown(e) {
          var diagram = e.diagram;
          var animation = new go.Animation();
          animation.isViewportUnconstrained = true; // So Diagram positioning rules let the animation start off-screen
          animation.easing = go.Animation.EaseOutExpo;
          animation.duration = 900;
          // Fade "down"
          animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
          animation.add(diagram, 'opacity', 0, 1);
          animation.start();
        }

  }

window.addEventListener('DOMContentLoaded', init);


