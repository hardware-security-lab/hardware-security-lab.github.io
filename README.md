# architecture.fail

[![Deploy Gatsby site to Pages](https://github.com/hardware-security-lab/hardware-security-lab.github.io/actions/workflows/gatsby.yml/badge.svg)](https://github.com/hardware-security-lab/hardware-security-lab.github.io/actions/workflows/gatsby.yml)

# Developer Instructions
> [!NOTE]
MacOS/Linux is recommended for developing the webiste. `yarn` is extremely slow on Windows 10 due to multiple possible reasons including but not limited to search indexing and Windows Defender scanning every file being written to disk.

1. Install the [`yarn`](https://yarnpkg.com/) package manager.
2. Run `yarn` to install dependencies.
3. Run `yarn dev` to set up a live updating local development environment


Pushing to this repository should build the website and deploy it. Check for a green tick next to the commit to verify successful build and deployment.

# Common Editing Workflows

## Adding to the Research section
Nothing to do here! Publications are automatically retrieved from DBLP, so wait until the conference makes it available to DBLP for indexing. Here are the current criteria for inclusion:
1. Daniel Genkin must be a co-author on the paper.
2. The paper must be peer-reviewed (i.e. published at a conference or journal). Other types of papers such as pre-prints are excluded.
3. Once we find another way to determine what constitutes a paper from the lab (especially, collaborations without Daniel), the paper must have been published while you were a member of the group (according to [src/data/people.yaml](https://github.com/hardware-security-lab/hardware-security-lab.github.io/blob/main/src/data/people.yaml), inclusive.

## Adding to the People section
1. Add their biographical information to [src/data/people.yaml](https://github.com/hardware-security-lab/hardware-security-lab.github.io/blob/main/src/data/people.yaml). Insert new entries in a position such that the list is in alphabetical order by last name.
2. Add their photo to [static/images/people](https://github.com/hardware-security-lab/hardware-security-lab.github.io/tree/main/static/images/people). The photo must be a square `.webp` headshot image with dimensions greater than `256 x 256`.

## Adding to the Highlighted Projects section
1. Add information to [src/data/highlighted-projects.yaml](https://github.com/hardware-security-lab/hardware-security-lab.github.io/blob/main/src/data/highlighted-projects.yaml).
2. Add the logo to [static/images/highlighted-projects](https://github.com/hardware-security-lab/hardware-security-lab.github.io/tree/main/static/images/highlighted-projectrs). Ideally, the photo should be a high-resolution `.svg` image with dimensions greater than `256 x 256` and with the project title below the logo.
