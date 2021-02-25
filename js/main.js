$(document).ready(function(){





//configurator of price
var modelSpecs,
    modelPrice,
    modelSpecsHolder,
    modelPriceHolder,
    modelPriceEURHolder;

modelSpecsHolder = $('#modelSpecs');
modelPriceHolder = $('#modelPrice');
modelPriceEURHolder = $('#modelPriceEUR');



modelPrice = 0;
modelSpecs = '';



function calculatePrice() {
    var modelPriceEngine = $('input[name=engine]:checked', '#autoForm').val() ;
    var modelPriceTransmission = $('input[name=transmission]:checked', '#autoForm').val() ;
    var modelPricePackage = $('input[name=package]:checked', '#autoForm').val() ;
    modelPriceEngine = parseInt(modelPriceEngine);
    modelPriceTransmission = parseInt(modelPriceTransmission);
    modelPricePackage = parseInt(modelPricePackage);




    
    modelPrice = modelPriceEngine + modelPriceTransmission + modelPricePackage;
   

    //alert (modelPrice);
    modelPriceHolder.text( addSpace(modelPrice) + ' рублей');
};



function compileSpecs(){
    modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();

    modelSpecs =  modelSpecs + ', ' + $('input[name=transmission]:checked + label', '#autoForm').text() + '. ';
 
    modelSpecs =  modelSpecs + ', ' + $('input[name=package]:checked + label', '#autoForm').text() + '. ';
  //alert(modelSpecs);

  modelSpecsHolder.text( modelSpecs );

};
//pri starte stranizi
calculatePrice();
compileSpecs();



//posle perekluchenia radio-knopok
$('#autoForm input').on('change', function(){
    calculatePrice();
    compileSpecs();
    calculateEUR();
});




//choice of the color
$('#colorSelector .colorItem').on('click', function(){
    var imgPath;
    imgPath = $(this).attr('data-img-path');
    //console.log(imgPath);
    $('#imgHolder img').attr('src', imgPath);
});






//dobavlyaet probel
function addSpace(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}


 //getting currency change
var currencyUrl = 'https://api.exchangeratesapi.io/latest';
var rurEURRate = 0;



$.ajax({
    url: currencyUrl,
    cache: false,
    success: function(html){
        console.log( html.rates.RUB);
        rurEURRate = html.rates.RUB;
        calculateEUR();
    }
});

function calculateEUR(){
    var modelPriceEUR = modelPrice / rurEURRate;
    //alert(modelPriceEUR);
    //dobavlyaem zenu na stranizy
   modelPriceEURHolder.text( addSpace(modelPriceEUR.toFixed(0)) + 'EUR' );
}

});




/*function compileSpecs(){
    modelSpecs = $('input[name-engine]:checked + label', '#autoForm').text() ;
    modelSpecs += ', ' + $('input[name-transmission]:checked + label', '#autoForm').text() ;
    modelSpecs += ', ' + $('input[name-package]:checked + label', '#autoForm').text() ;
    //alert (modelPrice);
    modelSpecsHolder.text(modelSpecs);

}*/




/*var modelPriceUSD;
function calculateUSD(){
    //modelPriceuSD = parseInt(modelPrice) / parseInt(rurUsdRate);
    modelPriceuSD = parseInt(modelPrice) / parseInt(rurUsdRate);
    $('#modelPriceUSD').text( '$ ' + addSpace(modelPriceUSD.toFixed(0)) );
} 
});*/