  var table = ['BFPV','CGJKQSXZ', 'DT', 'L', 'MN', 'R'];

  function getSoundex( texto ) {
    return soundexCore( texto );
  }

  function soundexCore( texto ) {
    var vogais = '[aeiouhwy]';
    var $palavra = texto;
    var $letras = $palavra.match(/.{1,1}/g);

    var soundex = '';
    var cnt = 0;
    var fonemaAnterior = 0;

    for( letra of $letras ) {
      if( cnt == 4 ) return soundex;
      // escreve no fonema a primeira letra caso seja a mesma no loop
      if( cnt == 0 ) {
        soundex = letra + '-';
        cnt++;
      }
      else {
        // escreve os demais fonemas
        re = new RegExp(vogais, 'ig');
        if( !letra.match(re) ) {
          fonemaAtual = calculate(letra);
          if( !fonemaAnterior || ( fonemaAnterior && fonemaAnterior != fonemaAtual ) ) {
            soundex += fonemaAtual;
            fonemaAnterior = fonemaAtual;
            cnt++;
          }
        }
      }

      if( cnt == 4 ) return soundex;
    }

    if( soundex.length < 5 ) {
      var somenteNumeros = soundex.split('-')[1];
      var str = somenteNumeros[0];

      for( var i=0; i < 3 - str.length; i++ ){
        soundex += '0';
      }
    }

    return soundex;
  }

  function calculate(letra) {
    var cnt = 0;
    for( item of table ) {
      texto = '['+item+']';
      re = new RegExp(texto, 'ig');

      if( letra.match(re) )
      {
        return ++cnt;
      }

      cnt++;
    }
  }
