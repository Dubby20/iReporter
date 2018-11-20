const incidents = [{
    id: 1,
    createdOn: new Date(),
    createdBy: 1, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '9.076479, 7.398574', // Lat Long coordinates
    status: 'Draft', // [draft, under investigation, resolved, rejected]
    Images: ['https://static.pulse.ng/img/incoming/origs7873831/3206361644-w644-h960/Godwin-Emefiele.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFTAylUzrw8NaJQHsojhiC5cYMklzdR43PypR_oUVtt4TNcwEWg'],
    Videos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFTAylUzrw8NaJQHsojhiC5cYMklzdR43PypR_oUVtt4TNcwEWg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgFTAylUzrw8NaJQHsojhiC5cYMklzdR43PypR_oUVtt4TNcwEWg'],
    comment: 'Employment scandals in Central Bank of Nigeria (CBN) and Federal Inland Revenue Service (FIRS)'
  },
  {
    id: 2,
    createdOn: new Date(),
    createdBy: 2, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.524379, 3.379206', // Lat Long coordinates
    status: 'Under Investigation', // [draft, under investigation, resolved, rejected]
    Images: ['https://static.pulse.ng/img/incoming/origs7532087/2036362149-w644-h960/babachir-lawal.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'],
    Videos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'],
    comment: '“Grass Cutting” scandal of ex-secretary to the Federal Government  '
  },
  {
    id: 3,
    createdOn: new Date(),
    createdBy: 3, // represents the user who created this record
    type: 'red-flag', // [red-flag, intervention]
    location: '6.444550, 7.490180', // Lat Long coordinates
    status: 'Resolved', // [draft, under investigation, resolved, rejected]
    Images: ['https://static.pulse.ng/img/incoming/origs7872357/5196368231-w644-h960/DSuR9f-XUAY9MDF.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPqMnK2DKy63bhx_-TCivEXE007u6IKzgxcg6kPEw2rohPkbQMIQ'],
    Videos: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVtbtjMiVvbOLVc7dA53s3_st7BjF-wtTxNu8Tq_-5al0IZBId'],
    comment: '$24 billion NNPC contract scam'
  }
];