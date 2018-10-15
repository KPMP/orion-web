import { getDataTypeIconInfo } from './dataTypeIconHelper.js';

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
	    	it('should return Transcriptomics when Bulk RNASeq', () => {
	    		let iconInfo = getDataTypeIconInfo("Bulk RNAseq"); 
	    		expect(iconInfo.iconDataType).toBe("Transcriptomics");
	    		expect(iconInfo.iconImage).toBe("icon_transcriptomics_132x132.png");
	    	});
	    	it('should return Transcriptomics when Segmental miRNA', () => {
	    		expect(getDataTypeIconInfo("Segmental miRNA").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-cell RNAseq', () => {
	    		expect(getDataTypeIconInfo("Single-cell RNAseq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-nucleus RNAseq', () => {
	    		expect(getDataTypeIconInfo("Single-nucleus RNAseq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Sub-segment RNAseq', () => {
	    		expect(getDataTypeIconInfo("Sub-segment RNAseq").iconDataType).toBe("Transcriptomics");
	    	});
    })
});
