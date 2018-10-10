import { getDataTypeIconInfo } from './dataTypeIconHelper.js';

describe('getDataTypeIconInfo', () => {
    it('should return the Other', () => {
        expect(getDataTypeIconInfo("Blah").iconDataType).toBe("Other");
    });
    it('should return Imaging', () => {
        expect(getDataTypeIconInfo("3-D tissue imaging").iconDataType).toBe("Imaging");
    });
    it('should return Metabolomics', () => {
        expect(getDataTypeIconInfo("Spatial Metabolomics").iconDataType).toBe("Metabolomics");
    });
    it('should return Proteomics', () => {
        expect(getDataTypeIconInfo("Near-single-cell Proteomics").iconDataType).toBe("Proteomics");
    });
    it('should return Transcriptomics', () => {
        expect(getDataTypeIconInfo("Bulk RNAseq").iconDataType).toBe("Transcriptomics");
    });
});
