package br.com.angularspringcrud.service;

import br.com.angularspringcrud.model.FootballTeam;

import java.util.List;
import java.util.Optional;

public interface FootballTeamService {

    FootballTeam saveFootballTeam(FootballTeam footballTeam);

    void deleteFootballTeam(FootballTeam footballTeam);

    FootballTeam updateFootballTeam(FootballTeam databaseTeam, FootballTeam screenTeam);

    List<FootballTeam> getAllFootballTeams();

    Optional<FootballTeam> getFootballTeamById(long teamId);


}
