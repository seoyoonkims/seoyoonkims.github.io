---
layout: profile
title: Home
nav_order: 1
description: "Seoyoon Kim — M.S. student in Electrical Engineering at KAIST. Research interests in robot manipulation and learning."
image: /assets/images/profile.webp
permalink: /
---

<section class="profile-intro" id="about" aria-labelledby="profile-name">
  <div class="profile-copy">
    <h1 id="profile-name">Seoyoon Kim</h1>
    <p>I am an M.S. student in Electrical Engineering at <a href="https://www.kaist.ac.kr/en/">KAIST</a>, advised by Prof. Min Jun Kim in the <a href="https://irsl-robotics.github.io/">Intelligent Robotic Systems Lab</a>.</p>
    <p><strong>Research interests:</strong> Robot Manipulation &amp; Learning.</p>
    <p class="profile-location">South Korea</p>
    <p class="profile-email"><a href="mailto:seoyoonkims@kaist.ac.kr">seoyoonkims@kaist.ac.kr</a></p>
    <div class="profile-links" aria-label="Social profiles">
      <a href="https://github.com/seoyoonkims/">GitHub</a>
      <span aria-hidden="true">/</span>
      <a href="https://www.linkedin.com/in/kim-seoyoon-9085b3319/">LinkedIn</a>
    </div>
  </div>
  <img class="profile-photo" src="{{ '/assets/images/profile.webp' | relative_url }}" alt="Seoyoon Kim" width="860" height="998" fetchpriority="high">
</section>

<section class="profile-section" id="publications" aria-labelledby="publications-heading">
  <h2 id="publications-heading">Publications</h2>
  {% for publication in site.data.profile.publications %}
  <article class="publication-entry{% if publication.preview %} publication-entry--media{% endif %}">
    {% if publication.preview %}
    <figure class="publication-media">
      <img src="{{ publication.preview.poster | relative_url }}" data-animated-src="{{ publication.preview.image | relative_url }}" data-still-src="{{ publication.preview.poster | relative_url }}" alt="{{ publication.preview.alt | escape }}" width="720" height="405">
    </figure>
    {% endif %}
    <div class="publication-content">
    <h3>{% if publication.url %}<a href="{{ publication.url }}">{{ publication.title | escape }}</a>{% else %}{{ publication.title | escape }}{% endif %}</h3>
    {% if publication.authors %}<p>{% for author in publication.authors %}{% if author.name == site.title %}<strong>{{ author.name | escape }}</strong>{% else %}{{ author.name | escape }}{% endif %}{% if author.equal_contribution %}*{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}{% if publication.note %} <span class="publication-note">({{ publication.note | escape }})</span>{% endif %}</p>{% endif %}
    {% if publication.venue %}<p class="publication-venue">{{ publication.venue | escape }}</p>{% endif %}
    {% if publication.links %}<div class="publication-links">{% for link in publication.links %}<a href="{{ link.url }}">{{ link.label | escape }}</a>{% endfor %}</div>{% endif %}
    </div>
  </article>
  {% endfor %}
</section>

<section class="profile-section" id="education" aria-labelledby="education-heading">
  <h2 id="education-heading">Education</h2>
  <div class="entry-list">
    {% for item in site.data.profile.education %}
    <article class="profile-entry">
      <a class="organization-logo" href="{{ item.url }}" aria-label="{{ item.institution | escape }} website"><img src="{{ item.logo | relative_url }}" alt="{{ item.institution | escape }}" width="100" height="56" loading="lazy"></a>
      <div class="entry-content">
        <div class="entry-heading">
          <h3>{{ item.degree | escape }}</h3>
          {% if item.period %}<p class="entry-date">{{ item.period }}</p>{% endif %}
        </div>
        <p class="entry-subtitle">{{ item.institution | escape }}{% if item.field %} · {{ item.field | escape }}{% endif %}</p>
        {% if item.details %}<ul class="entry-details">{% for detail in item.details %}<li>{{ detail | escape }}</li>{% endfor %}</ul>{% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="profile-section" id="honors" aria-labelledby="honors-heading">
  <h2 id="honors-heading">Honors and Awards</h2>
  <ul class="honors-list">
    {% for honor in site.data.profile.honors %}
    <li class="entry-heading"><p><strong>{{ honor.title | escape }}</strong> · {{ honor.institution | escape }}</p><span class="entry-date">{{ honor.period }}</span></li>
    {% endfor %}
  </ul>
</section>

<section class="profile-section" id="experience" aria-labelledby="experience-heading">
  <h2 id="experience-heading">Experience</h2>
  <div class="entry-list">
    {% for item in site.data.profile.experience %}
    <article class="profile-entry">
      <div class="organization-logo {{ item.logo_class }}"><img src="{{ item.logo | relative_url }}" alt="{{ item.logo_alt | escape }}" width="100" height="56" loading="lazy"></div>
      <div class="entry-content">
        <div class="entry-heading">
          <h3>{% if item.url %}<a href="{{ item.url }}">{{ item.organization | escape }}</a>{% else %}{{ item.organization | escape }}{% endif %}</h3>
          <p class="entry-date">{{ item.period }}</p>
        </div>
        <p class="entry-subtitle">{{ item.role | escape }}{% if item.affiliation %} · {{ item.affiliation | escape }}{% endif %}</p>
        <p class="entry-description">{{ item.description | escape }}</p>
        {% if item.notes_url %}<a class="entry-notes" href="{{ item.notes_url | relative_url }}">Internship notes</a>{% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="profile-section" id="skills" aria-labelledby="skills-heading">
  <h2 id="skills-heading">Skills</h2>
  {% for group in site.data.profile.skills %}
  <p class="skill-line"><strong>{{ group.category | escape }}:</strong> {{ group.items | join: ', ' | escape }}</p>
  {% endfor %}
</section>
