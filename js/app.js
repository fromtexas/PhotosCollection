// user interface controller
var UIController = (function(){

    var nodes = {
        delete:  '.del-btn',
        selectAll: '#select-all',
        choose: '.dropdown-content a',
        imgCont: '.col input',
        main: '.main',
        col: '.col',
        dropBtn: '.dropbtn'
    };
    
    var forDelArr = [];
    
    
   var  triggerDelBtn = () => {
        if(forDelArr.length > 0){
            document.querySelector(nodes.delete).disabled = false;
        }else{
            document.querySelector(nodes.delete).disabled = true;
        }
    };
    
    var setBtnText = (btnVal) => {
        var btn = document.querySelector(nodes.dropBtn);
        btn.innerHTML = `${btnVal}<span class="arrow"></span>`;
    };
    
    var hoverDark = (val, id) => {
            var node =  document.getElementById(id);
            var hover = node.querySelector('.hover-img');
            if(val){
                hover.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                hover.style.display = 'block';
            }else{
                hover.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                hover.style.display = 'none'; 
            }
        };
    
    return {
        domNodes: () => nodes,
        loadArr: () => {
            for(var i = 0; i < 40; i++){
                var size = Math.floor((Math.random()*10)+1);
                document.querySelector(nodes.main).innerHTML += `
                <div id='${i}' class="col img-container">
                    <label class="label-with-img">
                        <div class="hover-img"></div>
                        <input type="checkbox">
                        <img data-size='${size}' src="http://placeimg.com/100/100/any" alt="some img">
                    </label>
                </div>
                `;
            }
        },
        selectAll: (boxVal) => {
            
            forDelArr = [];
            var allCols = document.querySelectorAll(nodes.col);
            [...allCols].forEach( (item) => {
                if(boxVal){
                    forDelArr.push(item.id);
                }else {
                    forDelArr = [];
                }
                hoverDark(boxVal, item.id);
                triggerDelBtn();
                item.querySelector('input').checked = boxVal ? true : false;

            } )
        },
        selectBySize: (buttonVal) => {
            setBtnText(buttonVal);
            var allCols = document.querySelectorAll(nodes.col);
            forDelArr = [];
            
            document.querySelector(nodes.selectAll).checked = false;
            
            [...allCols].forEach( (item) => {
              item.querySelector('input').checked = false;
              hoverDark(false, item.id);
            } );
            
            if(buttonVal === 'Маленькие'){
                [...allCols].forEach( (item) => {
                    
                    var dataSizeVal = item.querySelector('img').dataset.size;
                    if(dataSizeVal <= 3){
                        hoverDark(true, item.id);
                        forDelArr.push(item.id);
                        triggerDelBtn();
                        item.querySelector('input').checked = true;
                    }
                } )
            } else if(buttonVal === 'Средние'){
                [...allCols].forEach( (item) => {
                    var dataSizeVal = item.querySelector('img').dataset.size;
                    if(dataSizeVal <= 6 && dataSizeVal > 3){
                        hoverDark(true, item.id);
                        forDelArr.push(item.id);
                        triggerDelBtn();
                        item.querySelector('input').checked = true;
                    }
                } )
            } else if(buttonVal === 'Большие'){
                [...allCols].forEach( (item) => {
                    var dataSizeVal = item.querySelector('img').dataset.size;
                    if(dataSizeVal <= 10 && dataSizeVal > 6){
                        hoverDark(true, item.id);
                        forDelArr.push(item.id);
                        triggerDelBtn();
                        item.querySelector('input').checked = true;
                    }
                } )
            } else {
                [...allCols].forEach( (item) => {
                        hoverDark(true, item.id);
                        forDelArr.push(item.id);
                        triggerDelBtn();
                        item.querySelector('input').checked = true;
                } )
            }
            
            
        },
        singleSelect: (id, chekedVal) => {
            hoverDark(chekedVal, id);
            if(chekedVal){

                forDelArr.push(id);
                triggerDelBtn();
            }else{
                
                var index = forDelArr.indexOf(id);
                forDelArr.splice(index, 1);
                triggerDelBtn();
            }
        },
        del: () => {
            console.log(forDelArr);
            forDelArr.forEach((item) => {
                
                var node =  document.getElementById(item);
                node.remove();

            })
            forDelArr = [];
            triggerDelBtn();
        }
        
        
    }
    
})();

var AppController = (function(ui){
    
    var domNodes = UIController.domNodes(); 
    UIController.loadArr();
    
   
    
    //select del button
    
    document.querySelector(domNodes.delete).addEventListener('click', (e) => {
        UIController.del();
        console.log('i am del button');
        e.preventDefault();   
    });
    
    //select all items
    document.querySelector(domNodes.selectAll).addEventListener('change', (e) => {
        var boxVal = e.target.checked;
        UIController.selectAll(boxVal);
        console.log('i am chekbox button');
          
    });
    
    //select dropdown buttons
    var selectors = document.querySelectorAll(domNodes.choose);
    var selectorsArr = [...selectors];
    
    selectorsArr.forEach((item) => {
        item.addEventListener('click', (e) => {
            var valueOf = e.target.innerHTML;
            console.log(valueOf);
            UIController.selectBySize(valueOf);
            e.preventDefault();
        })
    });
    
    //select item's checkboxes
    
    var images = document.querySelectorAll(domNodes.col);
    var imgArr = [...images];
    
    if(imgArr){
        imgArr.forEach((item) => {
            item.querySelector('input').addEventListener('change', (e) => {
                var chekedVal = e.target.checked;
                var id = item.id;
                UIController.singleSelect(id, chekedVal);
                e.preventDefault();
            })
        });
    }
    
    
    
    
    
    
    
    
})(UIController);