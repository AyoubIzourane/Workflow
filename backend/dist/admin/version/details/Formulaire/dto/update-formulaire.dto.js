"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFormulaireDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_formulaire_dto_1 = require("./create-formulaire.dto");
class UpdateFormulaireDto extends (0, mapped_types_1.PartialType)(create_formulaire_dto_1.CreateFormulaireDto) {
}
exports.UpdateFormulaireDto = UpdateFormulaireDto;
//# sourceMappingURL=update-formulaire.dto.js.map