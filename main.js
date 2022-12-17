const lists  = document.querySelectorAll('.list');
const button = document.querySelector('.button');

function addTask(){
    const btn       = document.querySelector('.add__btn');
    const addBtn    = document.querySelector('.add__item-btn');
    const cancelBtn = document.querySelector('.cancel__item-btn');
    const textarea  = document.querySelector('.textarea');
    const form      = document.querySelector('.form');

    let value

btn.addEventListener('click', ()=> {
    // при нажатии на добавить задачу, происходит смена видимости у блоков на странице
    form.style.display = 'block';
    btn.style.display = 'none';
    addBtn.style.display = "none";

    // при заполнении поля с названием карточки должна появляться кнопка добавить. если в поле есть значение
    textarea.addEventListener('input', function(event){
        value = event.target.value;
        if(value){
            addBtn.style.display = "block";
        }
        else{
            addBtn.style.display = "none";
        }
    })

    })
    // при нажатии унопки удалить карточку происхлждит удаление введенного значения ииз поля с текстом, удаление кнопок удалить  и добавить. но остается кнока с добавлением(+)
    cancelBtn.addEventListener('click', function clearArea(event){
    textarea.value = '';
    value = '';
    form.style.display = 'none';
    btn.style.display = 'block';
    })
    // создание новой карточки 
    addBtn.addEventListener('click', function (){
        const newItem = document.createElement('div');
        newItem.classList.add('list__item');
        newItem.draggable = "true";
        newItem.textContent = value;
        lists[0].append(newItem);

    //при добавлении новой карточки стирается информация из инпута и ресетится поле добавить карточку
        textarea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'block';
        dragNdrop()
    })

   
}

addTask();
// функция добавления новой доски 
function addBoard(){
    const boards = document.querySelector('.boards');
    const board  = document.createElement('div');
    board.classList.add('boards__item');
    board.innerHTML = `
   <span contenteditable="true" class="title">Введите название</span>
    <div class="list"></div>
    `
    boards.append(board);
    changeTitle();
    dragNdrop();
    deleteBoard()
}
button.addEventListener('click', addBoard)

// функция по изменению заголовка задачи. при клике на него текст стирается
function changeTitle(){
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        title.addEventListener('click', function(event){
            event.target.textContent = '';
        })
    })
}
changeTitle();

 let draggedItem = null;
 
 function dragNdrop(){
    let listItems = document.querySelectorAll('.list__item');
    const lists = document.querySelectorAll('.list');
    
    for(let i=0; i < listItems.length; i++){
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            draggedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0)
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block'
                draggedItem = null
            }, 0)
        })
        item.addEventListener('dblclick', () => {
            item.remove()
        })
    
        for (let k=0; k < lists.length; k++){
            const list = lists[k];
            list.addEventListener('dragover', e => e.preventDefault())
        
            list.addEventListener('dragenter', function(e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0, .3)';
            })
            list.addEventListener('dragleave', function(e){
                this.style.backgroundColor = 'rgba(0,0,0,0)'
            })
            list.addEventListener('drop', function(e){
                this.style.backgroundColor =  'rgba(0,0,0, 0)';
                this.append(draggedItem)
            })
        }
    }
}
dragNdrop()


function deleteBoard(){
    const boards = document.querySelectorAll('.boards__item')
    for(let i=0; i<boards.length; i++){
        const board = boards[i];

        board.addEventListener('dblclick', ()=>{
            board.remove();
            
        })
    }
}

deleteBoard()