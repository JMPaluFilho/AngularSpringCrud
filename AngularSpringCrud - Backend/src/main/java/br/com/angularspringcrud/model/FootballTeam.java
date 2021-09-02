package br.com.angularspringcrud.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "football_team")
public class FootballTeam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long teamId;

    @Column(name = "team_name")
    private String teamName;

    @Column(name = "team_stadium")
    private String teamStadium;

    @Column(name = "team_foundation")
    private LocalDate teamFoundation;

    @Column(name = "team_supporters")
    private int teamSupporters;

    public FootballTeam() {

    }

    public FootballTeam(String teamName, String teamStadium, LocalDate teamFoundation, int teamSupporters) {
        this.teamName = teamName;
        this.teamStadium = teamStadium;
        this.teamFoundation = teamFoundation;
        this.teamSupporters = teamSupporters;
    }

    public long getTeamId() {
        return teamId;
    }

    public void setTeamId(long teamId) {
        this.teamId = teamId;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTeamStadium() {
        return teamStadium;
    }

    public void setTeamStadium(String teamStadium) {
        this.teamStadium = teamStadium;
    }

    public LocalDate getTeamFoundation() {
        return teamFoundation;
    }

    public void setTeamFoundation(LocalDate teamFoundation) {
        this.teamFoundation = teamFoundation;
    }

    public int getTeamSupporters() {
        return teamSupporters;
    }

    public void setTeamSupporters(int teamSupporters) {
        this.teamSupporters = teamSupporters;
    }

    @Override
    public String toString() {
        return "FootballTeam{" +
                "teamId=" + teamId +
                ", teamName='" + teamName + '\'' +
                ", teamStadium='" + teamStadium + '\'' +
                ", teamFoundation=" + teamFoundation +
                ", teamSupporters=" + teamSupporters +
                '}';
    }
}
