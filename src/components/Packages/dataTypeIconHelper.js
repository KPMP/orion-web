const iconDataTypes = new Map(
    [
        ['Imaging',
            {
                iconDataType: 'Imaging',
                iconImage: 'icon_imaging_132x132.png',
                dataTypes: ['3-D tissue imaging', 'Multiplex ISH', 'Whole Slide Images']
            }
        ],
        ['Metabolomics',
            {
                iconDataType: 'Metabolomics',
                iconImage: 'icon_metabolomics_132x132.png',
                dataTypes: ['Spatial Metabolomics']
            }
        ],
        ['Other',
            {
                iconDataType: 'Other',
                iconImage: 'icon_other_132x132.png',
                dataTypes: ['DNA Methylation', 'Inflammatory Cells', 'Other']
            }
        ],
        ['Proteomics',
            {
                iconDataType: 'Proteomics',
                iconImage: 'icon_proteomics_132x132.png',
                dataTypes: ['Near-single-cell Proteomics', 'Sub-segmental Proteomics']
            }
        ],
        ['Transcriptomics',
            {
                iconDataType: 'Transcriptomics',
                iconImage: 'icon_transcriptomics_132x132.png',
                dataTypes: ['Bulk RNAseq', 'Segmental miRNA', 'Single-cell RNAseq', 'Single-nucleus RNAseq', 'Sub-segment RNAseq']
            }
        ]
    ]
);


export const getDataTypeIconInfo = (dataType) => {
    iconDataTypes.forEach((iconDataTypeInfo) => {
        if (iconDataTypeInfo.dataTypes.includes(dataType)) {
            return iconDataTypeInfo
        }
        else {
            return iconDataTypes.get('Other');
        }
    });
};



