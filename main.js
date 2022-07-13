let todoArray = [];

const CREATEAPPTITLE = (title) =>
{
  const APPTITLE = document.createElement('h1');
  APPTITLE.innerHTML = title;

  return APPTITLE;
}

const CREATETODOFORM = () =>
{
  const FORM = document.createElement('form');
  const INPUT = document.createElement('input');
  const ADDBUTTON = document.createElement('button');
  const WRAPPER = document.createElement('div');

  FORM.classList.add('input-group', 'mb-3');

  INPUT.classList.add('form-control');
  INPUT.placeholder = 'Input task name';

  ADDBUTTON.classList.add('btn', 'btn-primary');
  ADDBUTTON.textContent = 'Add a task';

  WRAPPER.classList.add('input-group-append');

  WRAPPER.append(ADDBUTTON);
  FORM.append(INPUT);
  FORM.append(WRAPPER);

  return {
    FORM,
    INPUT,
    ADDBUTTON
  }
}

const CREATETODOLIST = () =>
{
  const LIST = document.createElement('ul');

  LIST.classList.add('list-group');

  return LIST;
}

const CREATETODOITEM = (name) =>
{
  const TODOITEM = document.createElement('li');
  const BTNWRAPPER = document.createElement('div');
  const DONEBTN = document.createElement('button');
  const DELETEBTN = document.createElement('button');

  const RANDOMID = Math.random() * 15.75;
  TODOITEM.id = RANDOMID.toFixed(2);

  TODOITEM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  TODOITEM.textContent = name;

  DONEBTN.classList.add('btn', 'btn-success');
  DONEBTN.textContent = 'Done';

  DELETEBTN.classList.add('btn', 'btn-danger');
  DELETEBTN.textContent = 'Delete';

  BTNWRAPPER.append(DONEBTN, DELETEBTN);
  TODOITEM.append(BTNWRAPPER);

  return{
    TODOITEM,
    DONEBTN,
    DELETEBTN
  }
}

const CHANGETOITEMDONE = (arr, item) =>
{
  arr.map(obj => 
    {
      if(obj.id === item.id && obj.done === false)
      {
        obj.done = true;
      }
      else
      {
        obj.done = false;
      }
    });
}

const COMPLETEITEM = (item, btn) =>
{
  btn.addEventListener('click', () => 
  {
    todoArray = JSON.parse(localStorage.getItem(key));
    item.classList.toggle('list-group-item-success');
    CHANGETOITEMDONE(todoArray, item);

    localStorage.setItem(key, JSON.stringify(todoArray));
  });
}

const DELETEITEM = (item, btn) =>
{
  btn.addEventListener('click', () =>
  {
    if(confirm('Are You shure?'))
    {
      todoArray = JSON.parse(localStorage.getItem(key));

      const NEWLIST = todoArray.filter(obj => obj.id !== item.id);

      localStorage.setItem(key, JSON.stringify(NEWLIST));
      item.remove();
    }
  });
}

function createTodoApp(container, title, key)
{
  const APPTITLE = CREATEAPPTITLE(title);
  const APPFORM = CREATETODOFORM();
  const APPLIST = CREATETODOLIST();

  container.append(APPTITLE, APPFORM.FORM, APPLIST);

  APPFORM.FORM.addEventListener('submit', e => 
  {
    e.preventDefault();

    const TODOITEM = CREATETODOITEM(APPFORM.INPUT.value);

    if(!APPFORM.INPUT.value)
    {
      return;
    }

    COMPLETEITEM(TODOITEM.TODOITEM, TODOITEM.DONEBTN);
    DELETEITEM(TODOITEM.TODOITEM, TODOITEM.DELETEBTN);

    const CREATEITEMOBJ = (arr) =>
    {
      const ITEMOBJ = 
      {
        name: APPFORM.INPUT.value,
        id: TODOITEM.TODOITEM.id,
        done: false
      }

      arr.push(ITEMOBJ);
    }

    CREATEITEMOBJ(todoArray);

    localStorage.setItem(key, JSON.stringify(todoArray));
    
    APPLIST.append(TODOITEM.TODOITEM);
    APPFORM.INPUT.value = '';
  });
}