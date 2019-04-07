using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FleetManager.Models;
using FleetManager.Resources;

namespace FleetManager.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            //Model to API Model
            CreateMap<GPSCoordinates, GPSCoordinatesResource>().ForMember(g=>g.CarId, opt=>opt.MapFrom(f=>f.CarId));


            //API Model to Model
            CreateMap<GPSCoordinatesResource, GPSCoordinates>();
        }
    }
}
