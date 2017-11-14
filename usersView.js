var listUsers = {
            height: 35,
            view:"toolbar",
            elements:[
                { 
                    view:"text", 
                    id:"userSearchText", 
                    placeholder:"Type to filter...", 
                    labelWidth: 90,
                    width:400,
                }, 
                { id: "sortASCBtn", css:"userViewButton", view:"button", label: "Sort Asc", width:200, click: "sortASC"},
                { id: "sortDESCBtn", css:"userViewButton", view:"button", label: "Sort Desc", width:200, click: "sortDESC"}               
            ]
        };

        function sortASC(){
            $$("userList").sort("#age#", "asc");
        };

        function sortDESC(){
            $$("userList").sort("#age#", "desc");
        };

        var userView = {
            id: "userView",
            rows:[
                    listUsers,
                {
                    view:"editlist",
                    id:"userList",
                    template:"<b>#name#</b>. #age# years old. From #country#",
                    sort: "text",

                    select:true,
                    editable: true,
                    editaction:"dblclick",
                    editor: "text",
                    editValue: "name",

                    url: "data/users.js",
                    rules: {
                        name: function(name) {
                            return (name.toString().trim() !== "") && (parseInt(name.trim()) !== "NaN")
                        }
                    }
                }
            ]
        };

        var userChart = {
            view: "chart",
            id: "userChart",
            type:"bar",
            border:true,
            xAxis:{
                template:"#country#"
            },
            yValue: "#age#",
            yAxis:{
                start:0,
                end:70,
                step:10,
            },
            url: "data/users.js"
        };        