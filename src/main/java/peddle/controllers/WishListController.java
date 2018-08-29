package peddle.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import peddle.dto.EventDtoRs;
import peddle.services.WishListService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WishListController {

  @Autowired
  private WishListService wishListService;

  @GetMapping("/wishlist/user-events/{userId}")
  @ResponseBody
  public List<EventDtoRs> getAllUserEvents(@PathVariable Long userId){
    List<EventDtoRs> events = wishListService.getAllByUserId(userId);
    return events;
  }




}
