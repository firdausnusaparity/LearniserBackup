<template>
<div>
  <body id="page-top">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="#page-top">Homepage</a>
        <button
          class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponse"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponse">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                v-on:click="dashboard"
              >Dashboard</a>
            </li>
            <li class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                v-on:click="update"
              >Update Profile</a>
            </li>
            <li class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                v-on:click="logout"
              >Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Masthead -->
    <header class="masthead bg-primary text-white text-center">
      <div class="container d-flex align-items-center flex-column">
        <!-- Masthead Avatar Image -->
        <img class="masthead-avatar mb-5" src="../assets/social-studies.png" alt />

        <!-- Masthead Heading -->
        <h1 class="masthead-heading text-uppercase mb-0">Study Apps</h1>

        <!-- Icon Divider -->
        <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>

        <!-- Masthead Subheading -->
        <p class="masthead-subheading font-weight-light mb-0">Parity System</p>
      </div>
    </header>

    <!-- Portfolio Section -->
    <section class="page-section portfolio" id="portfolio">
      <div class="container">
        <!-- Portfolio Section Heading -->
        <h2
          class="page-section-subheading text-center text-uppercase text-secondary mb-0"
        >Choose Subject</h2>

        <!-- Icon Divider -->
        <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>

        <!-- Portfolio Grid Items -->
        <subjects />
        <!-- /.row -->
      </div>
    </section>

    <!-- About Section -->
    <section class="page-section bg-primary text-white mb-0" id="about">
      <div class="container">
        <!-- About Section Heading -->
        <h2 class="page-section-heading text-center text-uppercase text-white">About</h2>

        <!-- Icon Divider -->
        <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>

        <!-- About Section Content -->
        <div class="row">
          <div class="col-lg-4 ml-auto">
            <p
              class="lead"
            >This app is build by Parity System Sdn Bhd to help student in learning outside of the classroom</p>
          </div>
          <div class="col-lg-4 mr-auto">
            <p
              class="lead"
            >A place where students can learn subjects related to Sijil Pelajaran Malaysia</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <!-- <section class="page-section" id="contact">
    <div class="container">-->

    <!-- Contact Section Heading -->
    <!-- <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Contact Us</h2> -->

    <!-- Icon Divider -->
    <!-- <div class="divider-custom">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
    </div>-->

    <!-- Contact Section Form -->
    <!-- <div class="row">
    <div class="col-lg-8 mx-auto">-->
    <!-- To configure the contact form email address, go to mail/contact_me.php and update the email address in the PHP file on line 19. -->
    <!-- <form name="sentMessage" id="contactForm" novalidate="novalidate">
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Name</label>
                  <input class="form-control" id="name" type="text" placeholder="Name" required="required" data-validation-required-message="Please enter your name.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Email Address</label>
                  <input class="form-control" id="email" type="email" placeholder="Email Address" required="required" data-validation-required-message="Please enter your email address.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Phone Number</label>
                  <input class="form-control" id="phone" type="tel" placeholder="Phone Number" required="required" data-validation-required-message="Please enter your phone number.">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Message</label>
                  <textarea class="form-control" id="message" rows="5" placeholder="Message" required="required" data-validation-required-message="Please enter a message."></textarea>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <br>
              <div id="success"></div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-xl" id="sendMessageButton">Send</button>
              </div>
            </form>
          </div>
    </div>-->

    <!-- </div>
    </section>-->

    <!-- Footer -->
    <footer class="footer text-center">
      <div class="container">
        <div class="row">
          <!-- Footer Location -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">Location</h4>
            <p class="lead mb-0">
              73B, Jalan Flora 1/9, Taman Pulai Flora
              <br />Skudai, Johor, Malaysia
            </p>
          </div>

          <!-- Footer Social Icons -->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">Around the Web</h4>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-facebook-f"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-twitter"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-linkedin-in"></i>
            </a>
            <a class="btn btn-outline-light btn-social mx-1" href="#">
              <i class="fab fa-fw fa-dribbble"></i>
            </a>
          </div>

          <!-- Footer About Text -->
          <div class="col-lg-4">
            <h4 class="text-uppercase mb-4">About Parity System</h4>
            <p class="lead mb-0">Developer: Firdaus Nusa</p>
          </div>
        </div>
      </div>
    </footer>

    <!-- Copyright Section -->
    <section class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright &copy; Parity Systems Sdn Bhd 2019</small>
      </div>
    </section>

    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
    <div class="scroll-to-top d-lg-none position-fixed">
      <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>
  </body>
</div>
</template>

<script>
/* eslint-disable no-console */

import axios from "axios";
import subjects from "./Subjects";

import { mapActions } from "vuex";

export default {
  name: "Hello",
  components: { subjects },
  data() {
    return {
      currentUser: ""
    };
  },
  methods: {
    ...mapActions(["getData"]),
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    update() {
      this.$router.push("/form");
    },
    admin() {
      this.$router.push("/admin");
    },
    dashboard() {
      this.$router.push("/dashboard");
    },
    portfolio() {
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.getData();
    axios
      .get("users/currentusers", {
        headers: { authorization: localStorage.token }
      })
      .then(result => {
        if (result.data.user) {
          localStorage.setItem("role", result.data.user.role);
          this.currentUser = result.data.user.role;
          this.$store.state.role = result.data.user.role;
        } else {
          this.logout();
        }
      });
  }
};
</script>

  
