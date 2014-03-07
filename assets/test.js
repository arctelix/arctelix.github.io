define({

    test:function (obj, testName, assert, source){
        if (obj){
            var parts = testName.split('.')
            parts[0] = 'obj'
            testString = parts.join('.')
        }
        source = source || '';
        var stringV;
        try{
            var value = eval(testString)
        }catch(e){
            var error = e.message.replace('<','').replace('>','');
            var value = 'error'
        }

        if (value === assert || typeof value == assert) {
            assert = 'pass';
            if (value=='error') value = error;
            stringV = '<i class="pass">'+value+'</i>'
        }else{
            assert = 'fail';
            if (value=='error') value = error;
            stringV = '<i class="fail">'+value+'</i>'
        }
        //output
        if (source) source = source + '.';
        var outString = source + testName + ' = ';
        if (assert == 'fail') console.error(assert, outString, value);
        else console.log(assert, outString, value);
        try{
            var outPut = document.getElementById('test-data')
            outPut.innerHTML += outString+' '+stringV+'<br>';
        }catch(e){

        }
        return outString+' '+stringV+'<br>';
    }

});
