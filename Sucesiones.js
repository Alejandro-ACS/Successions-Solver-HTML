var sucesion = prompt("Introduce la sucesión").split(" ");

var equis = [];

var equis_p = [];

var formula = "";

var termino = null;

a = 0;

// ------------ Arreglar lista ------------ //

while (true){
    if (sucesion[a].includes(".") == false){
        sucesion[a] = parseInt(sucesion[a]);
    } else {
        sucesion[a] = parseFloat(sucesion[a]);
    }
    if (a == sucesion.length-1){
        break;
    }
    a += 1;
}

// ------------ Fin arreglar lista ------------ //

// ------------ Imprimir formula ------------ //

function print_form(bool, termino){
    b = 0;
    while (true){
        if (b == termino.length-1){
            if (bool == true){
                formula += termino[b].toString() + "+";
            } else {
                formula += termino[b].toString();
            }
        } else {
            formula += termino[b].toString() + "·";
        }
        if (b == termino.length-1){
            break
        }
        b += 1;
    }
    return formula
}

function imprimir_formula(sucesion){
    formula += equis[0].toString()+"+"
    c = 1;
    while (true){
        termino = numero_a_añadir(c+1);
        if (c != sucesion.length-1){
            print_form(true, termino);
        } else {
            print_form(false, termino);
        }
        if (c == sucesion.length-1){
            break;
        }
        c += 1;
    }
    return formula
}

// ------------ Fin imprimir formula ------------ //

// ------------ Generatriz ------------ //

function sacar_parte_decimal(numero){
    var numero = numero.toString().split(".");
    return numero[1];
}

function sacar_parte_entera(numero){
    var numero = numero.toString().split(".");
    return numero[0];
}

function identificar_periodo(decimal){
    var decimal = decimal.toString();
    var x = 0
    while (true){
        if (decimal[decimal.length-1-x] != decimal[decimal.length-1-(x+1)]){
            return decimal.length-1-x;
        }
        if (x == decimal.length-1){
            break;
        }
        x += 1;
    }
    return 0;
}

function calcular_generatriz(numero){
    var rangoI = identificar_periodo(sacar_parte_decimal(numero));
    var numero1 = sacar_parte_entera(numero*(10**(rangoI+1)));
    var numero2 = sacar_parte_entera(numero*(10**rangoI));
    var numerador = numero1-numero2
    var denominador = (10**(rangoI+1))-(10**rangoI)
    return [numerador, denominador];
}

// ------------ Fin generatriz ------------ //

// ------------ Funciones sucesion ------------ //

function numero_a_añadir(rango){
    var añadir = [];
    if (typeof equis_p[rango-1] === 'string'){
        añadir.push("(" + equis_p[rango-1] + ")");
    } else if (equis_p[rango-1] >= 0){
        añadir.push(equis_p[rango-1].toString());
    } else {
        añadir.push("(" + equis_p[rango-1].toString() + ")");
    }
    var d = 1;
    while (true){
        añadir.push('(n-' + (d).toString() + ')');
        if (d == rango-1){
            break;
        }
        d += 1;
    }
    return añadir
}

function numero_a_calcular_1_m(rango, equis, n){
    if (rango != 1){
        total = equis[rango-1];
        x = 0;
        while (true){
            total = total*(n-(x+1));
            if (x == rango-2){
                break;
            }
            x += 1;
        }
        return total
    } else{
        return sucesion[0];
    }
}
function numero_a_calcular_1_sum(rango, equis){
    total2 = 0;
    y = 0;
    while (true){
        total2 += numero_a_calcular_1_m(y+1, equis, rango);
        if (y == rango-2){
            break;
        }
        y += 1;
    }
    return total2
}

function numero_a_calcular_2(rango){
    if (rango != 1){
        var total = 1;
        var n = rango;
        var g = 0;
        while (true){
            total = total*(n-(g+1));
            if (g == rango-2){
                break;
            }
            g += 1;
        }
        return total
    } else {
        return 1
    }
}

// ------------ Fin funciones sucesion ------------ //

function main(){
    var h = 0;
    while (true){
        if (h == 0){
            equis.push(sucesion[0])
            equis_p.push(sucesion[0])
        }else{
            var total_anterior = numero_a_calcular_1_sum(h+1, equis);
            var total_posterior = numero_a_calcular_2(h+1);
            var numero = (sucesion[h]-total_anterior)/total_posterior;
            if (numero == parseInt(numero)){
                equis.push(parseInt(numero));
                equis_p.push(parseInt(numero));
            } else {
                equis.push(numero)
                decimal = sacar_parte_decimal(numero);
                if (decimal.length > 5){
                    if (decimal[decimal.length-2] != decimal[decimal.length-3]){
                        equis_p.push(numero)
                    }else{
                        equis_p.push(calcular_generatriz(parseFloat(numero.toString().slice(0, -1)))[0]+"/"+calcular_generatriz(parseFloat(numero.toString().slice(0, -1)))[1])
                    }
                } else {
                    equis_p.push(numero);
                }
            }
        }
        if (h == sucesion.length-1){
            break;
        }
        h += 1;
    }
    return imprimir_formula(sucesion)
}
console.log(main())
