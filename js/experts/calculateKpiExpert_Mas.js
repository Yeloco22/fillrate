var calculateKpiExpert_Mas={};
var MasivosEntities=[];


calculateKpiExpert_Mas.calculateKPI=function(entities,cb){  

    for(var i=0; i < store.niveles.length; i++){   
         
        if( store.niveles[i].id == $("#nivel_cb").val() )
             agrupador=store.niveles[i].field;
            
     }

     var cuantos=0;    

    for(var i=0;  i < entities.length; i++){
     
        entities[i].masivos={masivos:0,cantidad:0,values:[],totalSolicitado:0  };

        console.log("tipos de masivos", d3.nest()
            .key(function(d) { return d.TipoPedido; })
            .entries(entities[i].values));

        for(var j=0;  j < entities[i].values.length; j++){ 
            
                if( entities[i].values[j].TipoPedido == "Masivo" || entities[i].values[j].TipoPedido == "Camino Rural" ){    

                    cuantos++;
                    entities[i].masivos.cantidad+=Number(entities[i].values[j].CantSolFinal);                    

                }
                entities[i].masivos.totalSolicitado+=Number(entities[i].values[j].CantSolFinal);
                entities[i].masivos.values.push(entities[i].values[j]);

        }
        entities[i].masivos.masivos=0;

        if(entities[i].masivos.cantidad)
            entities[i].masivos.masivos=Math.round((entities[i].masivos.cantidad/entities[i].masivos.totalSolicitado)*100);

    }
   
    MasivosEntities=entities;

    loadsCount++;
    cb();

}


calculateKpiExpert_Mas.getTooltipDetail=function(entityId){

    for(var i=0;  i < MasivosEntities.length; i++){

        if(MasivosEntities[i].key.toLowerCase()==entityId.toLowerCase()){

            var text=`<div class="tooltipDetailElement"><img id="" src="images/masivos.png" style=""></img>
            <span style='color:#ffffff;font-size:${15*escalaTextos}px;'>Masivos: </span><br>
            <span style='color:#fff600;font-size:${15*escalaTextos}px;'>Volumen Solicitado:</span> <span style='color:#ffffff'>${MasivosEntities[i].masivos.masivos}% <span style='color:#ffffff;font-size:${12*escalaTextos}px;'>(${formatNumber(MasivosEntities[i].masivos.cantidad)} TM)</span><br>
            </div>
            `

            return text;
        }

    }
}


calculateKpiExpert_Mas.downloadCSV=function(entityId){

    for(var i=0;  i < entities.length; i++){

            if(entities[i].key == entityId){

                
                var csv = 'AgrupProducto,Año,CantEntfinal,CantSolfinal,Cliente,EstadoZTDem,Estatus_Entrega_Orig_2,Frente,GerenciaUN,Mes,Presentacion,Producto_Tactician,RegionZTDem,Segmento,TipoPedido,Unidad_de_Negocio,ZonaTransporte,dtDestara,dtLlegaCte,vc50_UN_Tact\n';

                var LLaves=["AgrupProducto","Año","CantEntfinal","CantSolfinal","Cliente","EstadoZTDem","Estatus_Entrega_Orig_2","Frente","GerenciaUN","Mes","Presentacion","Producto_Tactician","RegionZTDem","Segmento","TipoPedido","Unidad_de_Negocio","ZonaTransporte","dtDestara","dtLlegaCte","vc50_UN_Tact"];
                    //merge the data with CSV

                        for(var j=0;  j < entities[i].masivos.values.length; j++){

                            for(var k=0;  k < LLaves.length; k++){
                                    csv +=entities[i].masivos.values[j][LLaves[k]]+',';
                            }

                            csv += "\n";
                    };

                    var hiddenElement = document.createElement('a');

                    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
                    hiddenElement.target = '_blank';

                    hiddenElement.download = 'Masivos nivel_'+$("#nivel_cb").val()+' '+entityId+' '+$('#datepicker').val()+' al '+$('#datepicker2').val()+' .csv';
                    hiddenElement.click();

            }

    }

}