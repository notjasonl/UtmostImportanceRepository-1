import {
  createStyles,
  Navbar,
  TextInput,
  Code,
  UnstyledButton,
  Badge,
  Text,
  Group,
  ActionIcon,
  Tooltip,
  Title,
  Avatar,
  Box,
  useMantineTheme, ScrollArea,
} from "@mantine/core";

import { useForm } from "@mantine/form";
import {
  IconBulb,
  IconUser,
  IconCheckbox,
  IconSearch,
  IconPlus,
  IconSelector,
  IconShoppingCart,
  IconTags,
  IconLeaf,
  IconMedal,
} from "@tabler/icons";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
// import { UserButton } from '../UserButton/UserButton';
import { name } from "../util/constants";
import { getCategoryNames } from "../util/getProductData";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },
  title: {
    textAlign: "center",
    fontWeight: 800,
    fontSize: 40,
    letterSpacing: -1,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    "@media (max-width: 520px)": {
      fontSize: 28,
      textAlign: "left",
    },
  },

  section: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: 10,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: theme.spacing.md - theme.spacing.xs,
    paddingRight: theme.spacing.md - theme.spacing.xs,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.md,
    padding: `8px ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    fontSize: theme.fontSizes.md,
    alignItems: "center",
    flex: 1,
  },

  mainDescInner: {
    display: "flex",
    fontSize: theme.fontSizes.sm,
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,

    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: 20,
    height: 20,
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: theme.spacing.md - 6,
    paddingRight: theme.spacing.md - 6,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: theme.spacing.md + 2,
    paddingRight: theme.spacing.md,
    marginBottom: 5,
  },

  collectionLink: {
    display: "block",
    padding: `8px ${theme.spacing.xs}px`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.md,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
    },
  },
  hover: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },
}));

export default function NavbarSearch() {
  let navigate = useNavigate();
  let params = useParams();
  const category = params.category;
  const { classes } = useStyles();
  const { totalItems } = useCart();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const categories = getCategoryNames();

  const links = [
    { icon: IconShoppingCart, label: "Cart", notifications: totalItems },
  ];

  const handleSearch = (e: any) => {
    console.log(e.search);
    navigate(`item/${e.search}`);
  };

  const mainLinks = links.map((link) => (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <UnstyledButton key={link.label} className={classes.mainLink}>
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{link.label}</span>
        </div>
        {link.notifications > 0 && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    </Link>
  ));

  const collectionLinks = categories.map((collection) => (
    <Link to={`category/${collection}`} style={{ textDecoration: "none" }}>
      <a
        key={collection}
        className={`${classes.collectionLink} ${
          category == collection ? classes.hover : ""
        }`}
      >
        {collection}
      </a>
    </Link>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.section}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Title className={classes.title}>
            <Text
              component="span"
              inherit
              style={{ textDecoration: "underline lime" }}
            >
              {name}
            </Text>{" "}
            <Badge
              color="green"
              variant="outline"
              sx={{ textDecoration: "none !important" }}
            >
              BETA
            </Badge>
          </Title>
        </Link>
      </Navbar.Section>

      <Navbar.Section className={classes.section}>
        <Avatar src={"/wegmans.png"} size={120} radius={1250} mx="auto" />
        <Text align="center" size="lg" weight={500} mt="md">
          Wegmans{" "}
          <Tooltip label="This store is committed to creating a more sustainable future!">
            <Text component="span">
              <IconLeaf
                size={20}
                className={classes.mainLinkIcon}
                stroke={1.5}
                style={{ stroke: "lime" }}
              />
            </Text>
          </Tooltip>
        </Text>
        <Text
          size="xs"
          weight={500}
          color="blue"
          sx={{
            verticalAlign: "baseline",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          px={"md"}
          mr={"sm"}
        >
          <IconMedal size={15} stroke={1.5} /> 100% satisfaction guarantee
        </Text>
      </Navbar.Section>
      <form onSubmit={form.onSubmit((values) => handleSearch(values))}>
        <TextInput
          placeholder="Search"
          size="md"
          icon={<IconSearch size={12} stroke={1.5} />}
          rightSectionWidth={70}
          styles={{ rightSection: { pointerEvents: "none" } }}
          mb="sm"
          {...form.getInputProps("search")}
          autoComplete="off"
        />
      </form>

      <Navbar.Section className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea} className={classes.section}>
        <div className={classes.collections}>{collectionLinks}</div>
      </Navbar.Section>
    </Navbar>
  );
}