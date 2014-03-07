define(function (){

    var outPut = document.getElementById('out-put');
    return {
        test: function (testString, assert, source){

            source = source || '';
            var stringV;

            try{
                var value = eval(testString)
                }catch(e){
                    var error = e.message.replace('<','').replace('>','');
                    var value = 'error'
                    }

            console.log(typeof value, ' = ', assert);
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
            var outString = source + testString + ' = ';
            if (assert == 'fail') console.error(assert, outString, value);
            else console.log(assert, outString, value);
            outPut.innerHTML += outString+' '+stringV+'<br>';
        }
    }

});
