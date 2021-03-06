package br.com.angularspringcrud.service;

import br.com.angularspringcrud.repository.FootballTeamRepository;
import br.com.angularspringcrud.model.FootballTeam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FootballTeamServiceImpl implements FootballTeamService {

    @Autowired
    private FootballTeamRepository footballTeamRepository;

    @Override
    public FootballTeam saveFootballTeam(FootballTeam footballTeam) {
        return footballTeamRepository.save(footballTeam);
    }

    @Override
    public void deleteFootballTeam(FootballTeam footballTeam) {
        footballTeamRepository.delete(footballTeam);
    }

    @Override
    public FootballTeam updateFootballTeam(FootballTeam databaseTeam, FootballTeam screenTeam) {
        databaseTeam.setTeamName(screenTeam.getTeamName());
        databaseTeam.setTeamStadium(screenTeam.getTeamStadium());
        databaseTeam.setTeamFoundation(screenTeam.getTeamFoundation());
        databaseTeam.setTeamSupporters(screenTeam.getTeamSupporters());
        return databaseTeam;
    }

    @Override
    public List<FootballTeam> getAllFootballTeams() {
        return footballTeamRepository.findAll();
    }

    @Override
    public Optional<FootballTeam> getFootballTeamById(long teamId) {
        return footballTeamRepository.findById(teamId);
    }

    @Override
    public Page<FootballTeam> getPaginatedTeams(int page, int pageSize) {
        return footballTeamRepository.findAll(
                PageRequest.of(page, pageSize, Sort.Direction.DESC, "teamSupporters"));
    }

    @Override
    public Optional<FootballTeam> getFootballTeamByName(String teamName) {
        return footballTeamRepository.findByTeamName(teamName);
    }
}
