function addItem() {
    if( $$("filmsFormPanel").validate() ){ 
    var obj = ($$("filmsFormPanel").getValues());   
        obj.title = obj.title.replace(/<\/?[^>]+(>|$)/g, "");
        obj.id = $$("datatable").getLastId() + 1;   
        obj.rank = obj.id;                           
        $$("datatable").add(obj);
        $$("filmsFormPanel").clear();
        webix.message({
            text:"Added successfully",
            type:"form", 
            expire: 2000
        });
    } else {
        webix.message({
            text:"Attempt to assign new value to the existing item",
            type:"error", 
            expire: 2000
        });
    }
}

function updateItem() {
    if($$("filmsFormPanel").validate()) { 
        var obj = ($$("filmsFormPanel").getValues()); 
            obj.title = obj.title.replace(/<\/?[^>]+(>|$)/g, "");
        $$("datatable").updateItem( obj.id , obj);
        webix.message({
                text:"Updated successfully",
                type:"form", 
                expire: 2000
            });
        $$("filmsFormPanel").clear(); 
    } else {
        webix.message({
                text:"Update error",
                type:"error", 
                expire: 2000
            });
    }
}

function deleteItem() {
    if ( $$("filmsFormPanel").getValues().id  <  $$("datatable").count() ) { 
        $$("datatable").remove(id);
        webix.message("Item deleted successfully");
        $$("filmsFormPanel").clear(); 
    }
}

var datatable = { 
    rows: [
        {
            gravity: 2,
            view:"datatable", 
            id: "datatable",
            columns:
            [
                {id:"id",     header: "",                                 sort: "int",    width:50 },
                {id:"title",  header:[ "Title", {content:"textFilter"}],  sort: "string", width:530,  editor:"text"},
                {id:"year",   header:[ "Year", {content:"textFilter"}],   sort: "string", width: 150, editor:"text"},
                {id:"rating", header:[ "Rating", {content:"textFilter"}], sort: "string", width:100,  editor:"text"},
                {id:"votes",  header:[ "Votes", {content:"textFilter"}],  sort: "string", width:100,  editor:"text"},
            ],
            select: true,
            editable: true,
            editaction:"dblclick",
            rules: {
                title:function(title) { return ( title.trim() != "") },
                year:function(year){ return ( year > 1900 && year <= ( new Date().getFullYear() ) ) },              
                rating:function(rating) { return (rating.trim() != "" && parseInt(rating.trim()) >= 0 && parseInt(rating.trim()) <=10 )},
                votes:function(votes) { return (votes.trim() != "" && parseInt(votes.trim()) < 1000000)}
            }
        },
        {
            view: "dataview",
            id: "dataview",
            select: true,                    
            editaction:"dblclick",
            editable:true,
            editor: "text",
            xCount: 5,
            editValue: "title",

            minwidth: 200,
            type: {
                width: 200,
                height: 80,
                template: "#id#. <b>#title#</b> - #year#",
                select: true,
            }               
        }
    ]
};

var filmsFormPanel = {
        view:"form", id:"filmsFormPanel", minWidth: 200, gravity:0.5,
        elements: [
            {view: "template", template: "Edit Films", type: "section"},
            {name: "title", id:"title",  view:"text", label:"Title",  labelWidth:100, invalidMessage:"the field is empty"},                                       
            {name:"year",   id:"year",   view:"text", label:"Year",   labelWidth:100, invalidMessage:"invalid value"},                                        
            {name:"rating", id:"rating", view:"text", label:"Rating", labelWidth:100, invalidMessage:"invalid value" },                                        
            {name:"votes",  id:"votes",  view:"text", label:"Votes",  labelWidth:100, invalidMessage:"the field is empty"},
            {
                cols:[
                    { view:"button", value:"Add New" , type:"form", 
                        click: addItem                                
                    },
                    { view:"button", value:"Update", type: "form",
                        click:updateItem
                    },
                    { view:"button", value:"Clear",
                        click:function(){
                            $$("filmsFormPanel").clear(); 
                            $$("filmsFormPanel").clearValidation();
                        }
                    },
                    { view:"button", value:"Delete", type: "danger",
                        click:deleteItem
                    },
                ]
            },
            {}
        ],
        rules:{
            title:function(title) { return ( title.trim() != "") },
            year:function(year){ return (year > 1900 && year <=(new Date().getFullYear() ) ) },              
            rating:function(rating) { return (rating.trim() != "" && parseInt(rating.trim()) >= 0 && parseInt(rating.trim()) <=10 )},
            votes:function(votes) { return (votes.trim() != "" && parseInt(votes.trim()) < 1000000)}
        }
};