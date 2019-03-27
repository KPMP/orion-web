import { getDataTypeIconInfo, iconDataTypes } from './dataTypeIconHelper.js';

describe('getDataTypeIconInfo', () => {

	let packageTypeIcons = [
		{"iconType":"Metabolomics","packageTypes":["Spatial Metabolomics"]},
		{"iconType":"Transcriptomics","packageTypes":["Bulk RNA-Seq", "Bulk total/mRNA","Bulk microRNA","Segmental miRNA","Sub-segmental RNA-Seq","Single-cell RNA-Seq","Single-nucleus RNA-Seq"]},
		{"iconType":"Imaging","packageTypes":["3-D Tissue Imaging","Multiplex ISH","CODEX","Whole Slide Images"]},
		{"iconType":"Proteomics","packageTypes":["Bulk Proteomics","Sub-segmental Proteomics","Near-single-cell Proteomics"]},
		{"iconType":"Pilot 3","packageTypes":["Pilot 3 Receipt Picture"]},
		{"iconType":"Other","packageTypes":["DNA Methylation","Other"]}];

	describe("Other types", () => {
		it('should return Other when not in list', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "Blah");
	    		expect(iconInfo.iconDataType).toBe("Other");
	    		expect(iconInfo.iconImage).toBe("icon_other_132x132.png");
	    	});
	    	it('should return Other when Other', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Other").iconDataType).toBe("Other");
	    	});
	    	it('should return Other when DNA Methylation', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "DNA Methylation").iconDataType).toBe("Other");
	    	});
    });
    
    describe("Imaging types", () => {
	    	it('should return Imaging when 3-D tissue imaging', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "3-D tissue imaging");
	    		expect(iconInfo.iconDataType).toBe("Imaging");
	    		expect(iconInfo.iconImage).toBe("icon_imaging_132x132.png");
	    	});
			it('should return Imaging when 3-D Tissue Tmaging', () => {
				let iconInfo = getDataTypeIconInfo(packageTypeIcons, "3-D Tissue Imaging");
				expect(iconInfo.iconDataType).toBe("Imaging");
				expect(iconInfo.iconImage).toBe("icon_imaging_132x132.png");
			});
	    	it('should return Imaging when CODEX', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "CODEX").iconDataType).toBe("Imaging");
	    	});
	    	it('should return Imaging when Multiplex ISH', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Multiplex ISH").iconDataType).toBe("Imaging");
	    	});
	    	it('should return Imaging when Whole Slide Images', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Whole Slide Images").iconDataType).toBe("Imaging");
	    	});
    });

    describe("Metabolomics types", () => {
	    	it('should return Metabolomics when Spatial Metabolomics', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "Spatial Metabolomics");
	    		expect(iconInfo.iconDataType).toBe("Metabolomics");
	    		expect(iconInfo.iconImage).toBe("icon_metabolomics_132x132.png");
	    	});
    });

    describe("Proteomics types", () => {
	    	it('should return Proteomics when Near-single-cell Proteomics', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "Near-single-cell Proteomics");
	    		expect(iconInfo.iconDataType).toBe("Proteomics");
	    		expect(iconInfo.iconImage).toBe("icon_proteomics_132x132.png");
	    	});
	    	it('should return Proteomics when Sub-segmental Proteomics', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "Sub-segmental Proteomics");
	    		expect(iconInfo.iconDataType).toBe("Proteomics");
	    	});
    });
    
    describe("Transcriptomics types", () => {
	    	it('should return Transcriptomics when Bulk RNA-Seq', () => {
	    		let iconInfo = getDataTypeIconInfo(packageTypeIcons, "Bulk RNA-Seq");
	    		expect(iconInfo.iconDataType).toBe("Transcriptomics");
	    		expect(iconInfo.iconImage).toBe("icon_transcriptomics_132x132.png");
	    	});
	    	it('should return Transcriptomics when Segmental miRNA', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Segmental miRNA").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-cell RNA-Seq', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Single-cell RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Single-nucleus RNA-Seq', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Single-nucleus RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
	    	it('should return Transcriptomics when Sub-segment RNA-Seq', () => {
	    		expect(getDataTypeIconInfo(packageTypeIcons, "Sub-segmental RNA-Seq").iconDataType).toBe("Transcriptomics");
	    	});
    })
});
