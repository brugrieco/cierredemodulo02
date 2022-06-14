//importar el módulo autos
let autos = require("./autos");

let concesionaria = {
   //En autos guardar autos
   autos: autos,

   //la funcion buscarAuto recibe como parámetro un String. Se filtra que el parámetro 
   buscarAuto: function (patente) {
      if (this.autos.filter(auto => auto.patente === patente,).length > 0) {
         let car = this.autos.filter(auto => {
            return auto.patente === patente
         });
         return car[0]
      } else {
         return null;
      }
   },

   //la funcion verderAuto recibe como parámetro un String que representa a una patente. Con la funcion buscarAuto y pasandole como parámetro la misma patente, se cambia el vendido a true.
   venderAuto: function (patente) {
      (this.buscarAuto(patente)).vendido = true
   },

   //autosParaLaVenta no recibe ningún parámetro. En el return filtra a los autos que en su atributo "vendido" sean false y los devuelve como un Array.
   autosParaLaVenta: function () {
      return this.autos.filter(auto => auto.vendido == false)
   },

   //autosNuevos no recibe ningún parámetro. En el return filtra a los autos que en su atributo "km" sean menores a 100 y los devuelve como un Array.
   autosNuevos: function () {
      return this.autosParaLaVenta().filter(auto => auto.km < 100)
   },

   listaDeVentas: function () {
      return this.autos.filter(auto => auto.vendido == true).map(function (auto) {
         return auto.precio
      })
   },

   totalDeVentas: function(){
      if (this.listaDeVentas().length != 0){
         return this.listaDeVentas().reduce(function(acc, valor){
         return acc + valor
      })
      } else {
         return 0
      }      
   },

   puedeComprar: function(auto, persona){
      return (auto.precio <= persona.capacidadDePagoTotal && auto.precio / auto.cuotas <= persona.capacidadDePagoEnCuotas )
   },
   
   autosQuePuedeComprar: function (persona){
      return this.autosParaLaVenta().filter(auto => this.puedeComprar(auto, persona))
   }
   
}