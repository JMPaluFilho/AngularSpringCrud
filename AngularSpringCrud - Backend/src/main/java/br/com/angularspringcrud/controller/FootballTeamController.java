package br.com.angularspringcrud.controller;

import br.com.angularspringcrud.exception.ResourceNotFoundException;
import br.com.angularspringcrud.model.FootballTeam;
import br.com.angularspringcrud.service.FootballTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")
public class FootballTeamController {

    @Autowired
    private FootballTeamService footballTeamService;

    @PostMapping("/createTeam")
    public ResponseEntity<FootballTeam> createFootballTeam(@RequestBody FootballTeam footballTeam) {
        FootballTeam team = footballTeamService.saveFootballTeam(footballTeam);

        return ResponseEntity.ok(team);
    }

    @DeleteMapping("/deleteTeam/{teamId}")
    public ResponseEntity<Map<String, Boolean>> deleteFootballTeam(@PathVariable("teamId") long teamId) {
        FootballTeam databaseTeam = footballTeamService.getFootballTeamById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Football Team not exist with id: " + teamId));
        footballTeamService.deleteFootballTeam(databaseTeam);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateTeam/{teamId}")
    public ResponseEntity<FootballTeam> updateFootballTeam(@PathVariable("teamId") long teamId,
                                                           @RequestBody FootballTeam screenTeam) {
        FootballTeam databaseTeam = footballTeamService.getFootballTeamById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Football Team not exist with id: " + teamId));
        FootballTeam updatedTeam = footballTeamService.updateFootballTeam(databaseTeam, screenTeam);
        updatedTeam = footballTeamService.saveFootballTeam(updatedTeam);

        return ResponseEntity.ok(updatedTeam);
    }

    @RequestMapping(
            value = "/paginatedList",
            params = {"page", "pageSize"},
            method = RequestMethod.GET)
    public ResponseEntity<Page<FootballTeam>> getPaginatedTeams(@RequestParam("page") int page,
                                                @RequestParam("pageSize") int pageSize) {
        Page<FootballTeam> resultPage = footballTeamService.getPaginatedTeams(page, pageSize);

        if (page > resultPage.getTotalPages()) {
            throw new ResourceNotFoundException("Page is bigger than total pages");
        }

        return ResponseEntity.ok(resultPage);
    }

    @GetMapping("/teamList")
    public ResponseEntity<List<FootballTeam>> getAllFootballTeams() {
        List<FootballTeam> footballTeamList = footballTeamService.getAllFootballTeams();

        return ResponseEntity.ok(footballTeamList);
    }

    @GetMapping("/team/{teamId}")
    public ResponseEntity<FootballTeam> getFootballTeamById(@PathVariable("teamId") long teamId) {
        FootballTeam footballTeam = footballTeamService.getFootballTeamById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Football Team not exist with id: " + teamId));

        return ResponseEntity.ok(footballTeam);
    }
}
