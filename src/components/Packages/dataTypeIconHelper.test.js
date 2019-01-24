import { getDataTypeIconInfo, iconDataTypes } from './dataTypeIconHelper.js';
import packageTypeList from '../packageTypes';

describe('iconDataTypes', () => {
	it('should contain mapping for all package types', () => {
		let otherFound = false;
		let packageTypes = [];
		packageTypeList.options.forEach(function(obj) { packageTypes.push(obj.value) });
		let fullDataTypeList = [];
		for(let [iconDataTypeKey, iconDataTypeInfo] of iconDataTypes) {
			for(var i=0; i < iconDataTypeInfo.dataTypes.length; i++) {
				if (iconDataTypeInfo.dataTypes[i] !== "Other") {
					fullDataTypeList.push(iconDataTypeInfo.dataTypes[i]);
				} else {
					otherFound = true;
				}
			}
		}
		fullDataTypeList.sort();
		if (otherFound) {
			fullDataTypeList.push("Other");
		}
		expect(packageTypes).toEqual(fullDataTypeList);
	});
});

describe('getDataTypeIconInfo', () => {
    describe("Other types", () => {
	    	it('should return Other when not in list', () => {
	    		let iconInfo = getDataTypeIconInfo("Blah");
	    		expect(iconInfo.iconDataType).toBe("Other");
	    		expect(iconInfo.iconImage).toBe("icon_other_132x132.png");
	    	});
	    	it('should return Other when Other', () => {
	    		expect(getDataTypeIconInfo("Other").iconDataType).toBe("Other");
	    	});
	    	it('should return Other when DNA Methylation', () => {
	    		expect(getDataTypeIconInfo("DNA Methylation").iconDataType).toBe("Other");
	    	});
    });
    
    describe("Imaging types", () => {
	    	it('should return Imaging when 3-D tissue imaging', () => {
	    		let iconInfo = getDataTypeIconInfo("3-D tissue imaging");
	    		expect(iconInfo.iconDataType).toBe("Imaging");
	    		expect(iconInfo.iconImage).toBe("icon_imaging_132x132.png");
	    	});
	    	it('should return Imaging when CODEX', () => {
	    		expect(getDataTypeIconInfo("CODEX").iconDataType).toBe("Imaging");
	    	});
	    	it('should return Imaging when Multiplex ISH', () => {
	    		expect(getDataTypeIconInfo("Multiplex ISH").iconDataType).toBe("Imaging");
	    	});
	    	it('should return Imaging when Whole Slide Images', () => {
	    		expect(getDataTypeIconInfo("Whole Slide Images").iconDataType).toBe("Imaging");
	    	});
    });

    describe("Metabolomics types", () => {
	    	it('should return Metabolomics when Spatial Metabolomics', () => {
	    		let iconInfo = getDataTypeIconInfo("Spatial Metabolomics");
	    		expect(iconInfo.iconDataType).toBe("Metabolomics");
	    		expect(iconInfo.iconImage).toBe("icon_metabolomics_132x132.png");
	    	});
    });

    describe("Proteomics types", () => {
	    	it('should return Proteomics when Near-single-cell Proteomics', () => {
	    		let iconInfo = getDataTypeIconInfo("Near-single-cell Proteomics");
	    		expect(iconInfo.iconDataType).toBe("Proteomics");
	    		expect(iconInfo.iconImage).toBe("icon_proteomics_132x132.png");
	    	});
	    	it('should return Proteomics when Sub-segmental Proteomics', () => {
	    		let iconInfo = getDataTypeIconInfo("Sub-segmental Proteomics");
	    		expect(iconInfo.iconDataType).toBe("Proteomics");
	    	});
    });
    
    describe("Transcriptomics types", () => {
	    	it('should return Transcriptomics when Bulk RNA-Seq', () => {
	    		let iconInfo = getDataTypeIconInfo("Bulk RNA-Seq"); 
	    		expect(iconInfo.iconDataType).toBe("Transcriptomics");
	    		expect(iconInfo.iconImage).toBe("icon_transcriptomics_132x132.png");
	    	});
	    	it('should return Transcriptomics when Segmental miRNA', () => {
	    		expect(getDataTypeIconInfo("Segmental miRNA").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-cell RNA-Seq', () => {
	    		expect(getDataTypeIconInfo("Single-cell RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-nucleus RNA-Seq', () => {
	    		expect(getDataTypeIconInfo("Single-nucleus RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Sub-segment RNA-Seq', () => {
	    		expect(getDataTypeIconInfo("Sub-segment RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
    })
});
