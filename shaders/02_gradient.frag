#version 300 es
precision mediump float;

/**
 * \file
 * \author Donggu Han
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

#define PI 3.14159265359
#define HALF_PI 1.5707963267948966

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.0, 0.0, 0.0);
vec3 colorB = vec3(0.9529, 0.9373, 0.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

float circularInOut(float t) {
  return t < 0.5
    ? 0.5 * (1.0 - sqrt(1.0 - 4.0 * t * t))
    : 0.5 * (sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
}

float backOut(float t) {
  float f = 1.0 - t;
  return 1.0 - (pow(f, 3.0) - f * sin(f * PI));
}

out vec4 FragColor;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);

    pct.r = smoothstep(0.0, 1.0, st.x);
    pct.g = backOut(sin(st.x + u_time / 0.7)) / 12.;
    pct.b = circularInOut(tan(st.x * 0.2 + u_time / 1.5));

    color = mix(colorA, colorB, pct.gbr);

    // Plot transition lines for each channel
    color = mix(color,vec3(1.0,0.0,0.0),plot(st,pct.r));
    color = mix(color,vec3(0.0,1.0,0.0),plot(st,pct.g));
    color = mix(color,vec3(0.0,0.0,1.0),plot(st,pct.b));

    FragColor = vec4(color,1.0);
}