var _submit = document.getElementById('_submit'), 
_file = document.getElementById('_file'), 
_progress = document.getElementById('_progress'),
_ordernum= document.getElementById('_ordernum');

var upload = function(){
    if(_file.files.length === 0){
        return;
    }

    var data = new FormData();
    data.append('SelectedFile', _file.files[0]);
    data.append('order_value',_ordernum.value);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            try {
                var resp = JSON.parse(request.response);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + request.responseText + ']'
                };
            }
            console.log(resp.status + ': ' + resp.data);
        }
    };

    request.upload.addEventListener('progress', function(e){
        _progress.style.width = Math.ceil(e.loaded/e.total) * 100 + '%';
    }, false);

    request.open('POST', 'upload.php');
    request.send(data);
}

_submit.addEventListener('click', upload);