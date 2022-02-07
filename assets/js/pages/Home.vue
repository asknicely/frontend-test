<template>
  <div id="home">
    <h1 class="my-5">AskNicely PHP frontend test</h1>

    <h3 class="mb-3">Application</h3>
    <h5>The TODO App allows a user to add reminders of things they need to do. Here are the requirements for the app.</h5>
    <ul>
      <li>Users can add, delete and see their todos.</li>
      <li>All the todos are private, users can't see other user's todos.</li>
      <li>Users must be logged in order to add/delete/see their todos.</li>
    </ul>

    <h3 class="mb-3 mt-5">Usage</h3>
    <pre class="pre">
      <span>Login from the header button to start the journey of this Application.</span>
    </pre>

    <h3 class="mb-3 mt-5">Installation</h3>
    <pre class="pre">
      <span class="note"># install packages</span>
      <span>php composer.phar install</span>
      <span>npm install</span>
      <span class="note"># setup database</span>
      <span>cp config/config.yml.dist config/config.yml</span>
      <span>mysql -u root &lt;database&gt; < resources/database.sql</span>
      <span>mysql -u root &lt;database&gt; < resources/fixtures.sql</span>
      <span class="note"># start server</span>
      <span>php -S localhost:1337 -t web/ web/index.php</span>
    </pre>
  </div>
</template>

<script>
export default {
	name : "Home"
}
</script>

<style lang="scss">
  .pre {
    width: 100%;
    padding-top: 1.5rem;
    overflow: auto;
    font-size: 0.85rem;
    background-color: #303845;
    border-radius: 6px;
    color: #E6EBF0;
    line-height: 1.75rem;
    .note {
      line-height: 3.5rem;
      color: #8b949E;
    }
  }
</style>
