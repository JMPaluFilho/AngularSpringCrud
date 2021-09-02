package br.com.angularspringcrud.repository;

import br.com.angularspringcrud.model.FootballTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FootballTeamRepository extends JpaRepository<FootballTeam, Long> {

}
