using System;
using System.Collections.Generic;
using izmirimcardsimulation.Model.Common;
using izmirimcardsimulation.Model.Simulation;
using Microsoft.AspNetCore.Mvc;

namespace izmirimcardsimulation.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult GetTransportations()
        {
            GenericResult<List<CustomListItem>> response = new GenericResult<List<CustomListItem>>(true);
            List<CustomListItem> list = new List<CustomListItem>();
            list.Add(new CustomListItem() { value = 0, displayValue = "Seçiniz" });
            list.Add(new CustomListItem() { value = 1, displayValue = "Otobüs" });
            list.Add(new CustomListItem() { value = 2, displayValue = "Metro" });
            list.Add(new CustomListItem() { value = 3, displayValue = "Banliyö" });
            list.Add(new CustomListItem() { value = 4, displayValue = "Vapur" });
            response.data = list;
            return Json(response);
        }

        public JsonResult GetCardTypes()
        {
            GenericResult<List<CustomListItem>> response = new GenericResult<List<CustomListItem>>(true);
            List<CustomListItem> list = new List<CustomListItem>();
            list.Add(new CustomListItem() { value = 1, displayValue = "Tam" });
            list.Add(new CustomListItem() { value = 5, displayValue = "Öğrenci" });
            list.Add(new CustomListItem() { value = 6, displayValue = "Öğretmen" });
            list.Add(new CustomListItem() { value = 62, displayValue = "60 Yaş" });
            response.data = list;
            return Json(response);
        }
        public JsonResult GetRoutes(int trasnportationId)
        {
            GenericResult<List<CustomListItem>> response = new GenericResult<List<CustomListItem>>(true);
            List<CustomListItem> list = new List<CustomListItem>();
            list.Add(new CustomListItem() { value = 10, displayValue = "Seçiniz" });
            list.Add(new CustomListItem() { value = 11, displayValue = "676 Tınaztepe - Buca" });
            list.Add(new CustomListItem() { value = 22, displayValue = "978 Seferihisar-F.Altay" });
            list.Add(new CustomListItem() { value = 23, displayValue = "68 Alsancak-Bornova" });
            list.Add(new CustomListItem() { value = 24, displayValue = "96 Üçkuyular-Bostanlı" });
            response.data = list;
            return Json(response);
        }

        public JsonResult GetStations(int routeId)
        {
            GenericResult<List<CustomListItem>> response = new GenericResult<List<CustomListItem>>(true);
            List<CustomListItem> list = new List<CustomListItem>();
            if (routeId > 20)
            {
                list.Add(new CustomListItem() { value = 0, displayValue = "Seçiniz" });
                list.Add(new CustomListItem() { value = 1, displayValue = "Şirinyer" });
                list.Add(new CustomListItem() { value = 2, displayValue = "Halkapınar" });
                list.Add(new CustomListItem() { value = 3, displayValue = "Konak" });
                list.Add(new CustomListItem() { value = 4, displayValue = "Karşıyaka" });
            }
            else
            {
                list.Add(new CustomListItem() { value = 0, displayValue = "Seçiniz" });
                list.Add(new CustomListItem() { value = 1, displayValue = "Akmeşe" });
                list.Add(new CustomListItem() { value = 2, displayValue = "Belediye Sarayı" });
                list.Add(new CustomListItem() { value = 3, displayValue = "Köşe" });
                list.Add(new CustomListItem() { value = 4, displayValue = "Sıraevler" });
            }
            response.data = list;
            return Json(response);
        }
                public JsonResult RunSimulation([FromBody]List<SimulationInfo> simulationList)
        {
            GenericResult<List<SimulationResult>> response = new GenericResult<List<SimulationResult>>(true);
            List<SimulationResult> list = new List<SimulationResult>();
            for (var i = 0; i < simulationList.Count; i++)
            {
                var item = simulationList[i];
                list.Add(new SimulationResult { index = i, cardId = item.id, isSuccess = i % 2 == 0 ? true : false, explanation = "Lorem ipsum" + i, fare = (double) 0.01 });
            }
            response.data = list;
            return Json(response);
        }


    }
}