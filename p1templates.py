{% extends 'base.html' %}

{% block title %}Users{% endblock %}

{% block content %}

<h1>Users</h1>

<ul>
  {% for user in users %}
  <li>
    <a href="/users/{{ user.id }}">{{ user.full_name }}</a>
  </li>
  {% endfor %}
</ul>

<p><a class="btn btn-sm btn-secondary" href="/users/new">Add user</a></p>

{% endblock %}
part-one/templates/users/show.html
{% extends 'base.html' %}

{% block title %}{{ user.full_name }}{% endblock %}}

{% block content %}

<div class="row">

  {% if user.image_url %}
  <div class="col-sm-2 col-6">
    <img src="{{ user.image_url }}"
         alt="{{ user.full_name }}"
         class="img-fluid">
  </div>
  {% endif %}

  <div class="col-sm-10 col-12">
    <h1>{{ user.full_name }}</h1>

    <form>
      <button class="btn btn-primary btn-sm"
              formaction="/users/{{ user.id }}/edit"
              formmethod="GET">Edit
      </button>
      <button class="btn btn-danger btn-sm"
              formaction="/users/{{ user.id }}/delete"
              formmethod="POST">Delete
      </button>
    </form>

  </div>
</div>

{% endblock %}
part-one/templates/users/new.html
{% extends 'base.html' %}

{% block title %}
Create User
{% endblock %}

{% block content %}

<h1>Create a user</h1>
<form method="POST">

  <div class="form-group row">
    <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="first_name"
             name="first_name"
             placeholder="Enter a first name">
    </div>
  </div>

  <div class="form-group row">
    <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="last_name"
             name="last_name"
             placeholder="Enter a last name">
    </div>
  </div>

  <div class="form-group row">
    <label for="image_url" class="col-sm-2 col-form-label">Image URL</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="image_url"
             name="image_url"
             placeholder="Provide an image of this user">
    </div>
  </div>

  <div class="form-group row">
    <div class="ml-auto mr-3">
      <button type="submit" class="btn btn-success">Add</button>
    </div>
  </div>

</form>

{% endblock %}
part-one/templates/users/edit.html
{% extends 'base.html' %}

{% block title %}Edit {{ user.full_name }}{% endblock %}}

{% block content %}

<h1>Edit a user</h1>
<form method="POST">

  <div class="form-group row">
    <label for="first_name" class="col-sm-2 col-form-label">First Name</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="first_name"
             name="first_name"
             value="{{ user.first_name }}">
    </div>
  </div>

  <div class="form-group row">
    <label for="last_name" class="col-sm-2 col-form-label">Last Name</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="last_name"
             name="last_name"
             value="{{ user.last_name }}">
    </div>
  </div>

  <div class="form-group row">
    <label for="image_url" class="col-sm-2 col-form-label">Image URL</label>
    <div class="col-sm-10">
      <input type="text"
             class="form-control"
             id="image_url"
             name="image_url"
             value="{{ user.image_url }}">
    </div>
  </div>

  <div class="form-group text-right">
    <a href="/users" class="btn btn-outline-info">Cancel</a>
    <button type="submit" class="btn btn-success">Save</button>
  </div>

</form>

{% endblock %}