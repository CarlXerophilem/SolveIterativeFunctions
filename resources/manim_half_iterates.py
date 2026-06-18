"""
Manim scenes for the Theory page of SolveIterativeFunctions.

These render the animated figures embedded in theory.html. They are an
authoring/reproducibility artifact — NOT part of the static-site build.

Render all scenes to the site's visuals/ folder (Manim 0.19+, PyAV backend,
no ffmpeg binary required):

    python -m manim render -qm --format mp4 resources/manim_half_iterates.py -a
    # then copy media/videos/manim_half_iterates/720p30/*.mp4 into visuals/

A convenience render+copy is wired into the repo via the steps in the page's
commit; see resources/ for details. Scenes use a dark "panel" background so the
videos read as intentional figures in both the light and dark site themes.
"""

import numpy as np
from manim import (
    Scene,
    Axes,
    NumberLine,
    Line,
    DashedLine,
    Dot,
    Arrow,
    ArcBetweenPoints,
    Brace,
    MathTex,
    Tex,
    VGroup,
    Create,
    Write,
    FadeIn,
    FadeOut,
    Indicate,
    GrowArrow,
    config,
    UP,
    DOWN,
    LEFT,
    RIGHT,
    PI,
)

# ----- Site-matched palette on a dark figure panel -----
config.background_color = "#0e1726"
PANEL_TEXT = "#e6edf5"
BLUE = "#4a9eff"      # F / "full step"
PURPLE = "#b388ff"    # f / half-iterate
RED = "#ff6b6b"       # fixed points
GREEN = "#4ade80"     # start / highlights
GRAY = "#8aa0b5"      # diagonal y = x, axes

Tex.set_default(color=PANEL_TEXT)
MathTex.set_default(color=PANEL_TEXT)


def cobweb(axes, g, x0, n, color):
    """Return a VGroup of alternating vertical/horizontal cobweb segments for
    iterating g from x0, plus the orbit dots."""
    segs = VGroup()
    dots = VGroup()
    x = x0
    # start on the diagonal
    prev = axes.c2p(x, x)
    dots.add(Dot(prev, color=color, radius=0.045))
    for _ in range(n):
        y = g(x)
        v_end = axes.c2p(x, y)          # vertical to the curve
        segs.add(Line(prev, v_end, color=color, stroke_width=3))
        h_end = axes.c2p(y, y)          # horizontal to the diagonal
        segs.add(Line(v_end, h_end, color=color, stroke_width=3))
        dots.add(Dot(v_end, color=color, radius=0.04))
        prev = h_end
        x = y
    return VGroup(segs, dots)


class HalfIterateIdea(Scene):
    """A half-iterate is the function you apply twice to get F:
    two equal 'half-steps' compose into one F-step."""

    def construct(self):
        title = MathTex(r"f\circ f = F", font_size=52).to_edge(UP)
        caption = Tex("A half-iterate: apply it twice to reproduce one step of ", "$F$",
                      font_size=32).to_edge(DOWN, buff=0.6)

        nl = NumberLine(
            x_range=[0, 4, 1], length=11, include_numbers=True, color=GRAY,
            font_size=26,
        ).shift(0.4 * DOWN)

        p0, ph, pf = nl.n2p(1), nl.n2p(2), nl.n2p(3)
        d0 = Dot(p0, color=GREEN, radius=0.07)
        x_lbl = MathTex("x", color=GREEN, font_size=34).next_to(d0, DOWN, buff=0.2)

        # One full F-step (above the line)
        arcF = ArcBetweenPoints(p0, pf, angle=-PI * 0.6, color=BLUE, stroke_width=5)
        arcF.add_tip(tip_length=0.22)
        labF = MathTex(r"F", color=BLUE, font_size=40).next_to(arcF, UP, buff=0.12)

        # Two equal half-iterate steps (below the line)
        arcf1 = ArcBetweenPoints(p0, ph, angle=PI / 1.4, color=PURPLE, stroke_width=5)
        arcf1.add_tip(tip_length=0.2)
        arcf2 = ArcBetweenPoints(ph, pf, angle=PI / 1.4, color=PURPLE, stroke_width=5)
        arcf2.add_tip(tip_length=0.2)
        labf1 = MathTex("f", color=PURPLE, font_size=36).next_to(arcf1, DOWN, buff=0.1)
        labf2 = MathTex("f", color=PURPLE, font_size=36).next_to(arcf2, DOWN, buff=0.1)
        dh = Dot(ph, color=PURPLE, radius=0.06)
        df = Dot(pf, color=BLUE, radius=0.06)

        self.play(Write(title))
        self.play(Create(nl), FadeIn(d0), Write(x_lbl))
        self.play(Create(arcF), Write(labF), FadeIn(df), run_time=1.2)
        self.wait(0.4)
        self.play(Create(arcf1), Write(labf1), FadeIn(dh), run_time=0.9)
        self.play(Create(arcf2), Write(labf2), run_time=0.9)
        self.play(Indicate(VGroup(arcf1, arcf2), color=PURPLE), Indicate(arcF, color=BLUE))
        self.play(FadeIn(caption))
        self.wait(1.2)


class CobwebAttracting(Scene):
    """Cobweb diagram: iterating toward an attracting fixed point. The
    multiplier lambda = F'(x*) controls the local pull."""

    def construct(self):
        axes = Axes(
            x_range=[0, 1.4, 0.5], y_range=[0, 1.4, 0.5],
            x_length=6.2, y_length=6.2,
            axis_config={"include_numbers": True, "color": GRAY, "font_size": 22},
            tips=False,
        ).shift(0.3 * LEFT)

        diag = DashedLine(axes.c2p(0, 0), axes.c2p(1.4, 1.4), color=GRAY, dash_length=0.1)
        graph = axes.plot(lambda x: np.cos(x), x_range=[0, 1.4], color=BLUE, stroke_width=4)
        g_lbl = MathTex(r"F(x)=\cos x", color=BLUE, font_size=34).to_corner(UP + RIGHT).shift(0.2 * DOWN)
        d_lbl = MathTex(r"y=x", color=GRAY, font_size=28).next_to(axes.c2p(1.4, 1.4), UP + LEFT, buff=0.05)

        # Dottie number ~ 0.739085
        xstar = 0.739085
        fp = Dot(axes.c2p(xstar, xstar), color=RED, radius=0.07)
        fp_lbl = MathTex(r"x^*,\ |F'(x^*)|<1", color=RED, font_size=30).next_to(fp, RIGHT, buff=0.25).shift(0.3 * UP)

        web = cobweb(axes, np.cos, 0.15, 9, GREEN)

        self.play(Create(axes), Create(diag), Write(d_lbl))
        self.play(Create(graph), Write(g_lbl))
        self.play(FadeIn(web[1][0]))
        for seg in web[0]:
            self.play(Create(seg), run_time=0.18)
        self.play(FadeIn(fp), Write(fp_lbl))
        self.play(Indicate(fp, color=RED, scale_factor=1.6))
        self.wait(1.2)


class SchroderLinearization(Scene):
    """Koenigs/Schroeder: near a fixed point F is conjugate to multiplication
    by lambda. The half-iterate is conjugate to multiplication by sqrt(lambda)."""

    def construct(self):
        title = Tex("Local linearization (Schr", "\\\"o", "der / Koenigs)", font_size=40).to_edge(UP)

        # commuting square corners
        x = MathTex("x", font_size=46)
        Fx = MathTex("F(x)", font_size=46)
        u = MathTex(r"u=\sigma(x)", font_size=42)
        lu = MathTex(r"\lambda\,u", font_size=46)

        x.move_to([-3.2, 1.1, 0])
        Fx.move_to([3.2, 1.1, 0])
        u.move_to([-3.2, -1.6, 0])
        lu.move_to([3.2, -1.6, 0])

        top = Arrow(x.get_right(), Fx.get_left(), buff=0.3, color=BLUE, stroke_width=5)
        top_l = MathTex("F", color=BLUE, font_size=38).next_to(top, UP, buff=0.12)
        left = Arrow(x.get_bottom(), u.get_top(), buff=0.25, color=GRAY, stroke_width=4)
        left_l = MathTex(r"\sigma", color=GRAY, font_size=34).next_to(left, LEFT, buff=0.12)
        right = Arrow(lu.get_top(), Fx.get_bottom(), buff=0.25, color=GRAY, stroke_width=4)
        right_l = MathTex(r"\sigma^{-1}", color=GRAY, font_size=34).next_to(right, RIGHT, buff=0.12)
        bot = Arrow(u.get_right(), lu.get_left(), buff=0.3, color=GREEN, stroke_width=5)
        bot_l = MathTex(r"\times\,\lambda", color=GREEN, font_size=38).next_to(bot, DOWN, buff=0.12)

        self.play(Write(title))
        self.play(FadeIn(x), FadeIn(Fx))
        self.play(GrowArrow(top), Write(top_l))
        self.wait(0.3)
        self.play(GrowArrow(left), Write(left_l), FadeIn(u))
        self.play(GrowArrow(bot), Write(bot_l), FadeIn(lu))
        self.play(GrowArrow(right), Write(right_l))

        # token travels the long way and matches the direct F-arrow
        token = Dot(x.get_center(), color=GREEN, radius=0.09)
        self.add(token)
        self.play(token.animate.move_to(u.get_center()), run_time=0.7)
        self.play(token.animate.move_to(lu.get_center()), run_time=0.7)
        self.play(token.animate.move_to(Fx.get_center()), run_time=0.7)
        self.play(Indicate(Fx, color=GREEN))

        caption = MathTex(
            r"F=\sigma^{-1}\!\circ(\lambda\cdot)\circ\sigma",
            r"\quad\Longrightarrow\quad",
            r"f=\sigma^{-1}\!\circ(\sqrt{\lambda}\,\cdot)\circ\sigma",
            font_size=40,
        ).to_edge(DOWN, buff=0.5)
        caption[2].set_color(PURPLE)
        self.play(Write(caption))
        self.wait(1.4)


class ChebyshevHalfIterate(Scene):
    """The solvable case f(f(x)) = x^2 - 2 via the Chebyshev conjugacy
    x = 2 cos(theta). The half-iterate sits between y=x and F."""

    def construct(self):
        axes = Axes(
            x_range=[-2, 2, 1], y_range=[-2, 2.4, 1],
            x_length=7.5, y_length=6,
            axis_config={"include_numbers": True, "color": GRAY, "font_size": 22},
            tips=False,
        )

        diag = DashedLine(axes.c2p(-2, -2), axes.c2p(2, 2), color=GRAY, dash_length=0.1)
        F = axes.plot(lambda x: x * x - 2, x_range=[-2, 2], color=BLUE, stroke_width=4)

        def half(x):
            x = min(2.0, max(-2.0, x))
            return 2 * np.cos(np.sqrt(2) * np.arccos(x / 2))

        f = axes.plot(half, x_range=[-2, 2], color=PURPLE, stroke_width=4)

        F_lbl = MathTex(r"F(x)=x^2-2", color=BLUE, font_size=32).to_corner(UP + LEFT).shift(0.1 * DOWN)
        f_lbl = MathTex(r"f(x)=2\cos\!\big(\sqrt2\,\arccos\tfrac{x}{2}\big)",
                        color=PURPLE, font_size=30).next_to(F_lbl, DOWN, buff=0.2).align_to(F_lbl, LEFT)

        fp1 = Dot(axes.c2p(-1, -1), color=RED, radius=0.06)
        fp2 = Dot(axes.c2p(2, 2), color=RED, radius=0.06)

        # two half-steps from x0 land on F(x0)
        x0 = 0.6
        web = cobweb(axes, half, x0, 2, GREEN)
        target = Dot(axes.c2p(half(half(x0)), half(half(x0))), color=BLUE, radius=0.08)
        tgt_lbl = MathTex(r"f(f(x_0))=F(x_0)", color=PANEL_TEXT, font_size=30).to_corner(
            DOWN + RIGHT, buff=0.5
        )

        self.play(Create(axes), Create(diag))
        self.play(Create(F), Write(F_lbl))
        self.play(Create(f), Write(f_lbl))
        self.play(FadeIn(fp1), FadeIn(fp2))
        self.play(FadeIn(web[1][0]))
        for seg in web[0]:
            self.play(Create(seg), run_time=0.3)
        self.play(FadeIn(target), Write(tgt_lbl))
        self.play(Indicate(target, color=BLUE))
        self.wait(1.3)


class DivergenceNoFixedPoint(Scene):
    """f(f(x)) = x^2 + 1 has no real fixed point: F stays above y=x, so
    orbits escape to infinity and no continuous real half-iterate exists."""

    def construct(self):
        axes = Axes(
            x_range=[-2, 3, 1], y_range=[-1, 6, 1],
            x_length=7.5, y_length=6,
            axis_config={"include_numbers": True, "color": GRAY, "font_size": 22},
            tips=False,
        )
        diag = DashedLine(axes.c2p(-1, -1), axes.c2p(3, 3), color=GRAY, dash_length=0.1)
        F = axes.plot(lambda x: x * x + 1, x_range=[-2, 2.236], color="#ff9e4a", stroke_width=4)
        F_lbl = MathTex(r"F(x)=x^2+1", color="#ff9e4a", font_size=34).to_corner(UP + LEFT).shift(0.1 * DOWN)
        d_lbl = MathTex(r"y=x", color=GRAY, font_size=28).next_to(axes.c2p(3, 3), DOWN + LEFT, buff=0.05)

        # minimal gap F(x)-x = x^2 - x + 1 >= 3/4 at x = 1/2
        gx = 0.5
        gap = Line(axes.c2p(gx, gx), axes.c2p(gx, gx * gx + 1), color=GREEN, stroke_width=4)
        brace = Brace(gap, direction=LEFT, color=GREEN)
        gap_lbl = MathTex(r"F(x)-x\ge\tfrac34>0", color=GREEN, font_size=30).next_to(brace, LEFT, buff=0.1)

        web = cobweb(axes, lambda x: x * x + 1, 0.4, 3, RED)
        esc = Arrow(axes.c2p(2.3, 5.3), axes.c2p(2.7, 6.0), color=RED, buff=0, stroke_width=5)
        esc_lbl = MathTex(r"\to\infty", color=RED, font_size=34).next_to(esc, RIGHT, buff=0.05)

        self.play(Create(axes), Create(diag), Write(d_lbl))
        self.play(Create(F), Write(F_lbl))
        self.play(Create(gap), FadeIn(brace), Write(gap_lbl))
        self.wait(0.4)
        self.play(FadeIn(web[1][0]))
        for seg in web[0]:
            self.play(Create(seg), run_time=0.3)
        self.play(GrowArrow(esc), Write(esc_lbl))
        caption = Tex("No real fixed point $\\Rightarrow$ no continuous real half-iterate",
                      font_size=32, color=RED).to_edge(DOWN, buff=0.5)
        self.play(Write(caption))
        self.wait(1.3)
