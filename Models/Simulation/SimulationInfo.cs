using System;

namespace izmirimcardsimulation.Model.Simulation{
    public class SimulationInfo{
        public int id { get; set; }
        public int cardTypeId { get; set; }
        public int transportationId { get; set; }
        public DateTime boardingTime { get; set; }
        public int checkInStationId { get; set; }
        public int  checkOutStationId{ get; set; }
        public int routeId { get; set; }
        

    }
}