#version 300 es
precision mediump float;

/**
 * \file
 * \author Donggu Han
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

out vec4 FragColor;

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

float plot(vec2 st, float pct) {
    return  smoothstep(pct - .02, pct, st.y) - smoothstep(pct, pct + .02, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;

    float wave = .5 + .3 * tan(1. * st.x + u_time / 5.);
    float pulse=abs(cos(.8 * st.x * 5. + u_time / 2.));
    
    vec3 col = vec3(0.0, 0.0, 0.0);
    float pct_wave = plot(st,wave);
    float pct_pulse = plot(st,pulse);
    
    col = mix(col,vec3(1., 0., 0.), pct_wave);
    col = mix(col,vec3(0., 0., 1.), pct_pulse);
    
    FragColor=vec4(col, 1.);
}
