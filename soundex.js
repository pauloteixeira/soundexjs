var Soundex = function () {
  this.table = ['BFPV','CGJKQSXZ', 'DT', 'L', 'MN', 'R'];

  this.getSoundex = function( texto ) {
    return this.soundexCore( texto );
  }

  this.soundexCore = function( texto ) {
    var vogais = '[aeiouhwy1234567890]';
    var $palavra;
    var $letras;
    var soundex = '';
    var cnt = 0;
    var fonemaAnterior = 0;
    var self = this;

    if( texto.split(' ').length > 1 ){
      $arr = texto.split(' ');
      var result = [];
      $arr.forEach( function( item ) {
        result.push(self.soundexCore( item ));
      })

      return result;
    }

    //console.log("Resultado: ", texto);
    $palavra = texto;
    $letras = $palavra.match(/.{1,1}/g);

    for( letra of $letras ) {
      if( cnt == 4 ) return soundex;
      // escreve no fonema a primeira letra caso seja a mesma no loop
      if( cnt == 0 ) {
        soundex = letra.toUpperCase() + '-';
        cnt++;
      }
      else {
        // escreve os demais fonemas
        re = new RegExp(vogais, 'ig');
        if( !letra.match(re) ) {
          fonemaAtual = this.calculate(letra);
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

  this.calculate = function(letra) {
    var cnt = 0;
    for( item of this.table ) {
      texto = '['+item+']';
      re = new RegExp(texto, 'ig');

      if( letra.match(re) )
      {
        return ++cnt;
      }

      cnt++;
    }
  }
}