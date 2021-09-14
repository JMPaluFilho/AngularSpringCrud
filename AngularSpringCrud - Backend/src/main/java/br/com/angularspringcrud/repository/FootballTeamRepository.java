package br.com.angularspringcrud.repository;

import br.com.angularspringcrud.model.FootballTeam;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FootballTeamRepository extends JpaRepository<FootballTeam, Long> {

    @Query("SELECT ft FROM FootballTeam ft WHERE ft.teamName like %?1")
    Optional<FootballTeam> findByTeamName(String teamName);
}
