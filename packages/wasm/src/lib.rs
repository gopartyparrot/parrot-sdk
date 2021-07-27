use std::ops::{Add, Div, Mul, Sub};

use fixed::types::U64F64;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn u128bits_to_u64f64(u128_str: &str) -> String {
    match u128_str.parse::<u128>() {
        Ok(u) => U64F64::from_bits(u).to_string(),
        _ => format!("ParseIntError for \"{}\"", u128_str),
    }
}

#[wasm_bindgen]
pub fn u64f64_to_u128bits(u64_str: &str) -> String {
    match U64F64::wrapping_from_str(u64_str) {
        Ok(u) => u.to_bits().to_string(),
        _ => format!("ParseStrError for \"{}\"", u64_str),
    }
}

fn wrapping_uf64_apply(
    a_str: &str,
    b_str: &str,
    apply_fn: fn(a: U64F64, b: U64F64) -> U64F64,
) -> String {
    match crate::wrapping_uf64(a_str, b_str) {
        Ok((a, b)) => apply_fn(a, b).to_string(),
        Err(s) => s,
    }
}
fn wrapping_uf64(a_str: &str, b_str: &str) -> Result<(U64F64, U64F64), String> {
    Ok((
        U64F64::wrapping_from_str(a_str).or(Err(format!("wrapping_from_str a err {}", a_str)))?,
        U64F64::wrapping_from_str(b_str).or(Err(format!("wrapping_from_str b err {}", b_str)))?,
    ))
}

#[wasm_bindgen]
pub fn u64f64_add(a_str: &str, b_str: &str) -> String {
    wrapping_uf64_apply(a_str, b_str, |a, b| a.add(b))
}
#[wasm_bindgen]
pub fn u64f64_sub(a_str: &str, b_str: &str) -> String {
    wrapping_uf64_apply(a_str, b_str, |a, b| a.sub(b))
}
#[wasm_bindgen]
pub fn u64f64_mul(a_str: &str, b_str: &str) -> String {
    wrapping_uf64_apply(a_str, b_str, |a, b| a.mul(b))
}
#[wasm_bindgen]
pub fn u64f64_div(a_str: &str, b_str: &str) -> String {
    wrapping_uf64_apply(a_str, b_str, |a, b| a.div(b))
}

#[cfg(test)]
mod tests {
    #[test]
    pub fn test_u64f64_mul() {
        let r = crate::u64f64_mul("1.2", "2");
        assert_eq!("2.4", r)
    }

    #[test]
    pub fn test_u64f64_to_u128() {
        let bits = crate::u64f64_to_u128bits("0.5");
        let val = crate::u128bits_to_u64f64(&bits);
        assert_eq!("0.5", val)
    }
}
