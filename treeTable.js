var treeTable = {
            id: "productsTable",
            template: "Products View",
            view:"treetable",
            select: true,

            editable: true,
            editaction:"dblclick",            
            columns:[
                { 
                    id:"productId",   
                    template: "#id#",
                    header:"ID", 
                    width:50
                },
                { 
                    editor: "text",
                    editValue: "#title#",
                    id:"title",
                    header:"Title", 
                    template: "{common.treetable()} #title#",
                    width:300,
                    rules: {
                        title: function(title) {
                            return (title.toString().trim() !== "") && (parseInt(title.trim()) !== "NaN")
                        }
                    },                    
                },
                { 
                    template: function(obj){
                        if (obj.price !== undefined)
                            return webix.i18n.priceFormat(obj.price);
                        else
                            return "";
                    },
                    id:"productPrice",   
                    header:"Price",  
                    width:200
                }
            ],
            url: "data/products.js",
            on: {
                onAfterLoad: function(){
                    this.openAll();   
                }
            }
        };