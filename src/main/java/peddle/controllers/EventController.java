package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import peddle.dto.EventDto;
import peddle.services.EventServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {

  @Autowired
  private EventServiceImpl eventService;

  @RequestMapping(path = "", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
  @ResponseBody
  public List<EventDto> getAllEvents() {
    List<EventDto> events = eventService.getAll();
    return events;
  }

  /*
  @GetMapping("/api/event/{id}")
  public Optional<Event> getEvent(@PathVariable("id") Long id){
    Optional<Event> event = eventService.getById(id);
    return event;
  }
  */
}