import React from "react";
import Home from "./HomeComponent"

export class Snowflake extends Home {
  render() {
    return (
      <div class="snowflakes" aria-hidden="true">
        <div class="snowflake">💕</div>
        <div class="snowflake">💗</div>
        <div class="snowflake">🐝</div>
        <div class="snowflake">💗</div>
        <div class="snowflake">💕</div>
        <div class="snowflake">🐝</div>
        <div class="snowflake">💕</div>
        <div class="snowflake">💗</div>
        <div class="snowflake">🐝</div>
        <div class="snowflake">💗</div>
        <div class="snowflake">💕</div>
        <div class="snowflake">🐝</div>
      </div>
    );
  }
}
