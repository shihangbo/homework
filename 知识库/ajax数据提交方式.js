/**
 * @author watson
 * @version V1.0
 * @since 2018/5/24
 * @content: ajax数据提交方式
 */

// js提交表单（.submit()方法提交表单）
function stadardPost(url, params, method) {
  method = method? method: 'post';
  var form = document.createElement('form');
  form.setAttribute('method', method);
  form.setAttribute('action', BaseUrl+ url);
  for(var item in params) {
    if(params[item] != null && params[item] != undefined){
      var child = document.createElement('input');
      child.setAttribute('type', 'text');
      child.setAttribute('name', item);
      child.setAttribute('value', params[item]);
      form.appendChild(child);
    }

  }
  form.style.display = 'none';
  document.body.append(form);
  form.submit();
  document.body.removeChild(form)
}
