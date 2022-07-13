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

  TODOITEM.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  TODOITEM.textContent = name;

  DONEBTN.classList.add('btn', 'btn-success');
  DONEBTN.textContent = 'Done';

  DELETEBTN.classList.add('btn', 'btn-danger');
  DELETEBTN.textContent = 'Delete';

  BTNWRAPPER.append(DONEBTN, DELETEBTN);
  TODOITEM.append(BTNWRAPPER);

  return{
    ITEM,
    DONEBTN,
    DELETEBTN
  }
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

    const TODOITEM = createTodoApp(APPFORM.INPUT.value);

    if(!APPFORM.INPUT.value)
    {
      return;
    }

    APPLIST.append(TODOITEM);
    APPFORM.INPUT.value = '';
  })
}