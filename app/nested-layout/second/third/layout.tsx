const ThirdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <p>Layout 3</p>
      {children}
      {/* 同階層のpage.tsxが渡されている */}
    </>
  )
}

export default ThirdLayout
