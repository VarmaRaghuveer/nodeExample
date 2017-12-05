# nodeExample
This is a basic CRUD operations with nodejs and mongodb.

It deals with categories and products as 2 entities (and a collections in mongo db)

A sample Schema for categories document will be 

{
    "_id" : ObjectId("5a2694b997abfe39f8d2cd84"),
    "title" : "title1",
    "description" : "description1",
    "updDate" : ISODate("2017-12-05T12:44:41.753Z"),
    "insDate" : ISODate("2017-12-05T12:44:41.753Z"),
    "products" : [ 
        "products1", 
        "product2", 
        "product3"
    ],
    "__v" : 0,
    "child" : [ 
        {
            "title" : "childTitle1",
            "description" : "childDescription1",
            "products" : [ 
                "childProducts1"
            ],
            "child" : {
                "title" : "grandChildTitle1",
                "description" : "grandChildDescription1",
                "products" : [ 
                    "grandChildProducts1"
                ]
            }
        }, 
        {
            "title" : "childTitle2",
            "description" : "childDescription2",
            "products" : [ 
                "childProducts2", 
                "product3"
            ],
            "child" : {
                "title" : "grandChildTitle2",
                "description" : "grandChildDescription2",
                "products" : [ 
                    "grandChildProducts2"
                ]
            }
        }
    ]
}


and a sample schema for products document will be 

{
    "_id" : ObjectId("5a24fffacff0be2f942197dc"),
    "title" : "Product1",
    "description" : "Description1",
    "price" : 33,
    "updDate" : ISODate("2017-12-04T07:57:46.224Z"),
    "insDate" : ISODate("2017-12-04T07:57:46.224Z"),
    "category" : [ 
        "cat3", 
        "cat7", 
        "cat9"
    ],
    "__v" : 0
}



To run code after you pull from git
1) npm install
2) npm test (or node app)
3) job is listening to port 3000
