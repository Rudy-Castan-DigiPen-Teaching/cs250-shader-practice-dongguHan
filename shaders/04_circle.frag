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

 uniform vec2 u_resolution;
 uniform vec2 u_mouse;
 uniform float u_time;

// Convert pixel coords to normalized coords
 vec2 to_coord(vec2 pixel_point) {
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y) {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x *= u_resolution.x / u_resolution.y;
        // now to recenter the range
        point.x += (u_resolution.y - u_resolution.x) / u_resolution.x;
    }
    else {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
 }

 float sCircle(vec2 point, vec2 center, float radius) {
    float d = distance(point, center);
    return d - radius;
 }

// return 0 not in circle, 1 in circle
float circle(vec2 point, vec2 center, float radius) {
    float sd = sCircle(point, center, radius);
    // return 1.0 - step(0.0, sd);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
}

 void main(void) {
    vec2 position = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(0.4745, 0.0431, 0.5608);

    vec2 p = vec2(cos(u_mouse.x * 0.01), sin(u_mouse.y * 0.02)) * 0.5 + vec2(0.5);
    vec2 q = vec2(sin(u_mouse.x * 0.01), cos(u_mouse.y * 0.02)) * 0.5 + vec2(0.5);
    vec2 l = vec2(tan(u_mouse.x * 0.01), tan(u_mouse.y * 0.02)) * 0.5 + vec2(0.5);

    float t = circle(position, p, abs(sin(u_time) * 0.2));
    float n = circle(vec2(position.y, position.x), q, abs(cos(u_time) * 0.2));
    float m = circle(position, l, abs(tan(u_time) * 0.2));

    color = mix(color, vec3(0.3294, 0.2314, 0.7804), m);
    color = mix(color, vec3(0.6784, 0.251, 0.251), t);
    color = mix(color, vec3(0.2863, 0.6314, 0.1529), n);
    
    FragColor = vec4(color, 1.0);
 }
