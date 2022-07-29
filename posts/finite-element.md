---
title: Finite Element
metaDesc: The finite element method is a popular method for numerically solving differential equations arising in engineering and mathematical modeling. Typical problem areas of interest include the traditional fields of structural analysis, heat transfer, fluid flow, mass transport,
date: '2021-01-05'
socialImage: images/finite-element.jpg
---

### § Methods of Weighted Residual to Obtain Governing Weak Form

Consider: $-(k\hat{u}')'+b\hat{u}'+c\hat{u}=f$
Residual: $r(\hat{u})=-(k\hat{u}')'+b\hat{u}'+c\hat{u}-f$
Multiply by test function v such that v and u are in the same space (thus v also satisfies EBC) and integrate over domain:

$$\int_0^L r(\hat{u})vdx = 0 \rightarrow \int_0^L [-(k\hat{u}')'+b\hat{u}'+c\hat{u}-f]vdx=0 $$

Suppose v is sufficiently smooth so that we can integrate the 1st term by parts:
$$\int_0^L -(k\hat{u}')'vdx=-(k\hat{u}')v|^L_0 + \int_0^Lk\hat{u}'v'dx$$

Suppose the initial boundary is zero, then u(0)=0, it follows that that v at x=0 must also be 0 and we have

$$\int_0^L k\hat{u}'v'dx + \int_0^Lc\hat{u}vdx - \int_0^Lfvdx - T_vv(L)=0$$

### § Numerical Approximation: Galerkin Method in Weak Form

Let $\hat{u} \sim u_N = \sum_{k=1}^N \alpha_k \phi_k(x)$, then $\hat{u} \sim u_N = \sum_{i=1}^N \beta_i \phi_i(x)$

$$\int_0^L k \left( \sum_{k=1}^N \alpha_k \phi_k'(x) \right)\left( \sum_{i=1}^N \beta_i \phi_i'(x) \right)dx + \int_0^L c \left( \sum_{k=1}^N \alpha_k \phi_k(x) \right)\left( \sum_{i=1}^N \beta_i \phi_i(x) \right)dx - \int_0^L f \left( \sum_{i=1}^N \beta_i \phi_i(x) \right)dx-T_v \left( \sum_{i=1}^N \beta_i \phi_i(L) \right)dx$$ Let $$K_{kj}=\int_0^L k(x)\phi_j'(x)\phi_k'(x)dx=K_{jk}$$ $$C_{kj}=\int_0^Lc(x)\phi_j(x)\phi_k(x)dx$$ $$f_k=\int_0^L f\phi_k(x)dx+\phi_k(L)$$ The final equation to solve for is $$\sum_i B_i \left\{ \sum_k (K_{jk}+C_{jk})a_k -f_i \right\}=0 \rightarrow \left\{ \sum_k (K_{jk}+C_{jk})a_k -f_i \right\}=0 \forall B_i, \quad i=1, \dotsc ,n$$ The goal is to solve for $\alpha_k$ in $D\alpha=f$ where $D_{jk}=K_{jk}+C_{jk}$

### § Selecting Appropriate Basic Functions

Trial functions: $U_n(x)=\sum_{i=1}^n \alpha_i \phi_i(x)$
Test functions: $V_n(x)=\sum_{i=1}^n \beta_i X_i(x)$
How do we choose a $\phi(x)$ such that $\hat{u}$ satisfies the boundary conditions?

Local Functions:
$$\left\{ \begin{array}{c} \phi_A^e(\xi)=-\frac{1}{2}(\xi)(1-\xi)\\ \phi_B^e(\xi)=\frac{1}{2}(\xi)(1+\xi)\\ \phi_C^e(\xi)=(1-xi)(1+\xi)\\ \end{array} \right.$$

If we notice that $x=x_c+\xi \frac{h}{2} \rightarrow \xi=\frac{2(x-x_c)}{2}$

$$\left\{ \begin{array}{c} \phi_A^e(\xi)=\frac{-x(x_C)}{h} \frac{h-2x+2x_C)}{h}\\ \phi_B^e(\xi)=\frac{x(x_C)}{h} \frac{h+2x-2x_C)}{h}\\ \phi_C^e(\xi)=\frac{h-2x+2x_C}{h} \frac{h+2x+2x_C)}{h}\\ \end{array} \right. \to \left\{ \begin{array}{c} \phi_A^e(\xi)=\frac{(x_C-x)(x_B-x)}{(x_C-x_A)(x_B-x_A)}\\ \phi_B^e(\xi)=\frac{(x_A-x)(x_B-x)}{(x_A-x_C)(x_B-x-C)}\\ \phi_C^e(\xi)=\frac{(x_A-x)(x_C-x)}{(x_A-x_B)(x_C-x_B)}\\ \end{array} \right.$$

Procedure: Compute $K_{kj}=\int_0^1 \bar{x}^{1/2}\phi_j'\bar{x}\phi_j'\bar{x}d\bar{x}$ after normalization

$$\left[ \begin{array}{ccc} \int_0^h \sqrt{\bar{x}}\phi_1'(\bar{x})\phi_1'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_1'(\bar{x})\phi_2'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_1'(\bar{x})\phi_3'(\bar{x})d\bar{x} \\ \int_0^h \sqrt{\bar{x}}\phi_2'(\bar{x})\phi_1'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_2'(\bar{x})\phi_2'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_2'(\bar{x})\phi_3'(\bar{x})d\bar{x} \\ \int_0^h \sqrt{\bar{x}}\phi_3'(\bar{x})\phi_1'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_3'(\bar{x})\phi_2'(\bar{x})d\bar{x} & \int_0^h \sqrt{\bar{x}}\phi_3'(\bar{x})\phi_3'(\bar{x})d\bar{x} \\ \end{array} \right]$$

Compute $C_{kj}=2\int_0^1\phi_j(\bar{x})\phi_k(\bar{x})d\bar{x}$

$$ \left [ \begin{array}{ccc} \int_0^h \phi_1(\bar{x})\phi_1(\bar{x})d\bar{x} &\int_0^h \phi_1(\bar{x})\phi_2(\bar{x})d\bar{x} &\int_0^h \phi_1(\bar{x})\phi_3(\bar{x})d\bar{x} \\ \int_0^h \phi_2(\bar{x})\phi_1(\bar{x})d\bar{x} &\int_0^h \phi_2(\bar{x})\phi_2(\bar{x})d\bar{x} &\int_0^h \phi_2(\bar{x})\phi_3(\bar{x})d\bar{x} \\ \int_0^h \phi_3(\bar{x})\phi_3(\bar{x})d\bar{x} &\int_0^h \phi_3(\bar{x})\phi_2(\bar{x})d\bar{x} &\int_0^h \phi_3(\bar{x})\phi_3(\bar{x})d\bar{x} \\ \end{array} \right] $$

Solve for $\alpha_k$ in $(K_{kj}+C_{kj})\alpha_k = f_k \to \alpha_k=(K_{kj}+C_{kj})^{-1}f_k$ Approximated Solution: $\hat{u} \sim u_N=\sum_{k=1}^N \alpha_k(\bar{x})$

### § Discussion:

- Approximated solution using quadratic basic function converges to the analytical solution quicker than linear functions.
- We generally work with the weak form to minimize the residual
- The smaller the mesh, the more accurate $u(x,\phi)$ will be
- In the discussion of error analysis, quadratic algorithm yields a smaller error than linear due to a larger big O.

We first note the symmetry of the membrane and simplify the model by considering only the first quadrant. Equation of Ellipse is $$(\frac{x}{a})^2+(\frac{y}{b})^2=1$$ We segment each of the quadrant into two individual meshes: Biquadratic Quadralateral and Bilinear Triangle
Rectangular Element: $Nodes [1 \;2 \;3 \;5 \;6 \;7 \;8 \;9 \;0]$
Triangular Element: $Nodes [3 \;4 \;12 \;11 \;10 \;7]$

### § Procedure

The following demonstrates the procedure in calculating the stiffness matrix and loading vector of the elements.

1. Choose $\Omega$ and $\Phi_j$, $j=1,2,...,N_e$ and specify the x-y coordinates $(x_1,y_1),(x_2,y_2),...,(x_N,y_N)$ of nodal points of each element.
1. Specify a set of $N_i$ integration points $(\xi_l,\eta_l), \; l=1,2,...,N_l$ and quadrature weights for $\Omega$}
1. Calculate the values of $\Phi_j, \partial \Phi_j / \partial \xi, \partial \Phi_j / \partial \eta$ at the integration points.}
1. Calculate the values of $x=x(\xi,\eta), y=y(\xi,\eta)$ and their derivatives at the integration points.}
1. Calculate the values of the Jacobian and the functions $\partial \xi /\partial x, \partial \xi / \partial y, \partial \eta / \partial x, \partial \eta / \partial y$}
1. Compute $\partial \phi_j^e / \partial x$ and $\partial \phi_j^e / \partial y$}
1. Calculate the values of $k, b$ and $f$
   We may skip this step if we assume $k=f=1$
1. Using the results of steps 3 to 7, calculate the values of the integrands at the integration points and multiply each by $w_i|\mathbf{J}(\xi_l,\eta_l)|$
1. Sum the numbers to obtain $k_{ij}^e$ and $f_i^e$

### § Torsional Properties

Physical quantities of interest, such as shear stresses and the relationship between the twisting moment, or torque, T, and the angle of twist $\theta$, per unit length of the shaft, can be determined as follows, once the potential function u is known.

$$T =2G\theta \int_\Omega ud\Omega$$

The shear stresses on the elliptical cross-section are given by the following expressions:

$$\sigma_{xz}=2G\theta \frac{\partial u}{\partial y}, \; \sigma_{yz}=-2G\theta \frac{\partial u}{\partial x}$$
The stress function may be written as

$$\phi=B\lbrace(\frac{x}{a})^2+(\frac{y}{b})^2-1)\rbrace$$
But since
$$\frac{\partial^2 \phi}{\partial x^2}+\frac{\partial^2 \phi}{\partial y^2}=-2G\theta$$
We get that
$$B=-\frac{a^2b^2G\theta}{a^2+b^2}$$
$$ \sigma*{xz}=\frac{\partial \phi}{\partial y}=\frac{2By}{b^2}\quad \sigma*{yz}=-\frac{\partial \phi}{\partial x}=-\frac{2Bx}{a^2} $$
$$ T =2G\theta \int\_\Omega ud\Omega=-\pi B ab $$

We can also verfiy that
$$\phi=B\lbrace(\frac{x}{a})^2+(\frac{y}{b})^2-1)\rbrace=\phi=-\frac{a^2b^2G\theta}{a^2+b^2}\lbrace(\frac{x}{a})^2+(\frac{y}{b})^2-1)\rbrace$$

The 27-node hexahedron is the analog of the 8-node “serendipity” quadrilateral
For example, the general formulas for the midside nodes are
$$N_j=\frac{1}{4}(1-\xi^2)(1+\eta_j\eta)(1+\varsigma_j\varsigma)$$

$$N_j=\frac{1}{4}(1+\xi_j\xi)(1-\eta^2)(1+\varsigma_j\varsigma)$$

$$N_j=\frac{1}{4}(1+\xi_j\xi)(1+\eta_j\eta)(1-\varsigma^2)$$

Hexahedral element with tri-quadratic approximation functions

$N_1=\frac{1}{8}(1-\xi)(1-\eta)(1-\varsigma)$

$N_2=\frac{1}{8}(1+\xi)(1-\eta)(1-\varsigma)$

$N_3=\frac{1}{8}(1+\xi)(1+\eta)(1-\varsigma)$

$N_4=\frac{1}{8}(1-\xi)(1+\eta)(1-\varsigma$

$N_5=\frac{1}{8}(1-\xi)(1-\eta)(1+\varsigma)$

$N_6=\frac{1}{8}(1+\xi)(1-\eta)(1+\varsigma)$

$N_7=\frac{1}{8}(1+\xi)(1+\eta)(1+\varsigma)$

$N_8=\frac{1}{8}(1-\xi)(1+\eta)(1+\varsigma)$

$N_9=\frac{1}{4}(1-\xi^2)(1-\eta)(1-\varsigma)$

$N_{10}=\frac{1}{4}(1+\xi)(1-\eta^2)(1-\varsigma)$

$N_{11}=\frac{1}{4}(1-\xi^2)(1+\eta)(1-\varsigma)$

$N_{12}=\frac{1}{4}(1-\xi)(1-\eta^2)(1-\varsigma)$

$N_{13}=\frac{1}{4}(1+\xi)(1-\eta)(1+\varsigma^2)$

$N_{14}=\frac{1}{4}(1+\xi)(1-\eta^2)(1+\varsigma^2)$

$N_{15}=\frac{1}{4}(1-\xi^2)(1+\eta)(1+\varsigma)$

$N_{16}=\frac{1}{4}(1-\xi)(1-\eta^2)(1+\varsigma)$

$N_{17}=\frac{1}{4}(1-\xi)(1-\eta)(1-\varsigma^2)$

$N_{18}=\frac{1}{4}(1+\xi)(1-\eta^2)(1-\varsigma^2)$

$N_{19}=\frac{1}{4}(1+\xi)(1+\eta)(1-\varsigma^2)$

$N_{20}=\frac{1}{4}(1-\xi)(1+\eta^2)(1-\varsigma^2)$

$N_{21}=\frac{1}{2}(1-\xi^2)(1-\eta^2)(1-\varsigma)$

$N_{22}=\frac{1}{2}(1-\xi^2)(1-\eta^2)(1+\varsigma)$

$N_{23}=\frac{1}{2}(1-\xi^2)(1-\eta)(1-\varsigma^2)$

$N_{24}=\frac{1}{2}(1+\xi^2)(1-\eta^2)(1-\varsigma^2)$

$N_{25}=\frac{1}{2}(1-\xi^2)(1+\eta)(1-\varsigma^2)$

$N_{26}=\frac{1}{2}(1-\xi)(1-\eta^2)(1-\varsigma^2)$

$N_{27}=(1-\xi^2)(1-\eta^2)(1-\varsigma^2)$

### § Bending of a Uniform, Homogeneous Elastic Beam (Euler-Bernoulli Theory)

Strong Form:
$$\int_0^L\lbrace (EIw'')''-q\rbrace vdx-\lbrace -(EIw'')(L)-M_L\rbrace v'(L)+\lbrace (EIw'')(L)-v_L\rbrace v(L)=0 \quad \forall \;v \quad s.t \; v(0)=0, \; v'(0)=0$$

Weak Form:

$$\int_0^L EIw''v''dx-\int_0^L qvdx+M_Lv'(L)-v_Lv(L)=0 \quad \forall \; v \quad s.t \; v(0)=0, \; v'(0)=0$$

Principal of Virtual Work

$$\int_0^L EIw''v''dx=\int_0^L qvdx-M_Lv'(L)+v_Lv(L)$$

But since we don't have any applied moment of load at the supported end,our governing equation is actually

$$\int_0^L EIw''v''dx=\int_0^L qvdx$$

The simplest Bernoulli-Euler plane beam element with two end nodes has four degrees of freedom $\mathbf{u^e}=[v_1 \theta_1 v_2 \theta_2]^T$.

Shape functions for this problem are conveniently expressed in terms of the dimensionless coordinate

$$\xi=\frac{2x}{h}-1 \qquad \frac{dx}{d\xi}=\frac{1}{2}h \qquad \frac{d\xi}{dx}=\frac{2}{h}$$

### § Discussion:

1. Maximum shear stress occurs at the extreme values, namely at a and b (as it approaches the boundary). Furthermore, from Figure 9, we see that greater max stress occurs at the end of the minor axis of the ellipse

1. Stress along the two axes of the centerlines is symmetrical due to the geometric symmetry of the membrane. This is expected since the heaviest concentration is the middle and distributed evenly across the membrane.
