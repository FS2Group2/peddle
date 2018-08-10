package peddle.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.persistence.GenerationType;

@Setter
@Getter
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "city")
public class City {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "c_id", unique = true)
  private Long id;

  @Column(name = "c_name")
  private String name;

  public City(String name) {
    this.name = name;
  }
}