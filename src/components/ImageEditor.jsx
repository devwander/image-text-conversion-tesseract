import styled from "styled-components"
import { BiRotateLeft, BiRotateRight, BiReflectVertical, BiReflectHorizontal } from "react-icons/bi";
import { useEffect, useState } from "react";

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 5px;

    &:hover {
        scale: 0.95;
    }
`

const RotateReflectButton = styled.button`
    padding: 10px;
    display: flex;
    font-size: 18px;
    cursor: pointer;
`

const Section = styled.div`
    width: 100%;
    height: 100%;
    
`

const Container = styled.div`
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 1px 2px;
`

const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ResetFilters = styled(Button)`
    background-color: white;
`

const NewImage = styled(Button)`
    background-color: white;
`

const Save = styled(Button)`
    background-color: #0081cf;
    color: white;
    margin-left: 5px;
`

const ImgContent = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px 0;
    background-color: #eee;
    overflow: hidden;
    border: 2px solid black;
`

const InputImage = styled.input`
    display: none;
`

const ImgFile = styled.img`
    height: 100%;
    weight: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    object-fit: contain;
`

const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    height: 100%;
`

const RotateContent = styled.div`
    display: flex;
    gap: 5px;
`

const RotateRight = styled(RotateReflectButton)`

`

const RotateLeft = styled(RotateReflectButton)`

`

const ReflectVertical = styled(RotateReflectButton)`

`

const ReflectHorizontal = styled(RotateReflectButton)`

`

const SpanRangeValue = styled.span`

`

const Range = styled.input`
    width: 80%;
`

const FiltersContent = styled.div`
    display: flex;
    gap: 5px;
`

const Filter = styled(Button)`
    background-color: white;
`

function ImageEditor() {
    
    const [rangeValue, setRangeValue] = useState(100)

    const [rotate, setRotate] = useState(0)
    const [flipY, setFlipY] = useState(1)
    const [flipX, setFlipX] = useState(1)

    const [filterActive, setFilterActive] = useState("Glow")
    const [range, setRange] = useState({
        max: 0,
        value: 0
    })

    const filters = {
        Glow: { value: 100, max: 200},
        Contrast: { value: 100, max: 200},
        Saturation: { value: 100, max: 200},
        Gray: { value: 0, max: 100},
        Inversion: { value: 0, max: 100},
    }

    function handleButtonClick(name) {
        setFilterActive(name);
    }

    useEffect(() => {
        setRangeValue(filters[filterActive].value)
    }, [filterActive])

    function getButtonClass(name) {
        if (filterActive === name) {
          return {fontWeight: "bold"};
        }
    }
    
    function handleDirection(type) {
        if (type === "rotateRight") {
          setRotate(rotate + 90);
        } else if (type === "rotateLeft") {
          setRotate(rotate - 90);
        } else if (type === "reflectY") {
          setFlipY(flipY === 1 ? -1 : 1);
        } else {
          setFlipX(flipX === 1 ? -1 : 1);
        }
    }

    return (
        <Section>
            <Container>
                <Header>
                    <div>
                        <ResetFilters>Clear Filters</ResetFilters>  
                    </div>

                    <div>
                        <NewImage>New Image</NewImage>
                        <Save>Save</Save>
                    </div>
                </Header>

                <ImgContent>
                    <InputImage type="file" accept="image/*" />
                    <ImgFile  
                        src="../../public/noimage.jpg" 
                        alt="image"
                        style={{
                            transform: `rotate(${rotate}deg) scale(${flipY}, ${flipX})`
                        }}
                    />
                </ImgContent>

                <Footer>
                    <RotateContent>
                        <RotateRight 
                            onClick={() => handleDirection('rotateRight')}
                        >
                            <BiRotateRight />
                        </RotateRight>
                        <RotateLeft 
                            onClick={() => handleDirection('rotateLeft')}
                        >
                            <BiRotateLeft />
                        </RotateLeft>
                        <ReflectVertical 
                            onClick={() => handleDirection('reflectY')}
                        >
                            <BiReflectVertical />
                        </ReflectVertical>
                        <ReflectHorizontal 
                            onClick={ () => handleDirection('reflectX')}
                        >
                            <BiReflectHorizontal />
                        </ReflectHorizontal>
                    </RotateContent>

                    <SpanRangeValue>{rangeValue}</SpanRangeValue>

                    <Range type="range" value={rangeValue} max={filters[filterActive].max} onChange={(e)=>setRangeValue(e.target.value)}/>

                    <FiltersContent>
                        <Filter style={getButtonClass("Glow")} onClick={() => handleButtonClick("Glow")} >Glow</Filter>
                        <Filter style={getButtonClass("Contrast")} onClick={() => handleButtonClick("Contrast")}>Contrast</Filter>
                        <Filter style={getButtonClass("Saturation")} onClick={() => handleButtonClick("Saturation")}>Saturation</Filter>
                        <Filter style={getButtonClass("Gray")} onClick={() => handleButtonClick("Gray")}>Gray</Filter>
                        <Filter style={getButtonClass("Inversion")} onClick={() => handleButtonClick("Inversion")}>Inversion</Filter>
                    </FiltersContent>
                </Footer>

            </Container>
        </Section>
    )
}

export default ImageEditor