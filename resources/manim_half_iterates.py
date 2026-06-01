from manim import Axes, DashedLine, Dot, FadeIn, MathTex, Scene, VGroup


class FixedPointCobweb(Scene):
    """A small reproducible scene for optional fixed-point visuals in the site."""

    def construct(self):
        axes = Axes(
            x_range=[-2.2, 2.2, 1],
            y_range=[-2.2, 4.2, 1],
            x_length=8,
            y_length=5,
            axis_config={"include_numbers": False},
        )
        diagonal = DashedLine(axes.c2p(-2, -2), axes.c2p(2, 2), dash_length=0.12)
        graph = axes.plot(lambda x: x * x - 2, x_range=[-1.2, 2.1], color="#1a73e8")
        fixed_one = Dot(axes.c2p(-1, -1), color="#e74c3c")
        fixed_two = Dot(axes.c2p(2, 2), color="#e74c3c")
        title = MathTex(r"F(x)=x^2-2,\qquad F(F(x))", font_size=42).to_edge(1)
        self.play(FadeIn(VGroup(axes, diagonal, graph, fixed_one, fixed_two, title)))
        self.wait(1)
